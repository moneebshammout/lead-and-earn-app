from django.db.models import Q
from custom_user.models import Level
from lead.models import Lead, LeadCategory
from referral.models import ReferralLink
from django.shortcuts import get_object_or_404
from django.db import connection


def generate_lead_on_user_creation(user, source=None):
	"""
	Creates a lead when a user is created by refrral link.
	"""
	if not source:
		return

	link = get_object_or_404(ReferralLink, id=source)
	Lead.objects.create(refered_client=user, referral_link=link)
	# add logic for the user points to be refreshed using pessmistic locking and also updating user level
	
	update_user_points_and_level(link.owner,link)


def update_user_points_and_level(user,link):
	"""
	Updates the user points and level when a lead is created.
	it takes advantage of Pessimistic locking to force other transactions to wait 
 	until the current transaction is finished.
	"""

	with connection.cursor() as cursor:
		cursor.execute("BEGIN IMMEDIATE;")
		cursor.execute(
			"""
			SELECT points, level_id
			FROM  CustomUser
			WHERE id = %s
			""",
			[user.id],
		)
		_ = (
			cursor.fetchone()
		)  # locking these two fields forcing the other transactions to wait elemenating race condition

	# updating user points
	lead_count = Lead.objects.filter(referral_link=link).count()
	lead_category = LeadCategory.objects.filter(
		Q(leads_from__lte=lead_count) & Q(leads_to__gte=lead_count)
	).first()
	
	if not lead_category:
		return

	user.points += lead_category.points
	user.save()

	# updating user level
	level = Level.objects.filter(
		Q(points_from__lte=user.points) & Q(points_to__gte=user.points)
	).first()

	if level and user.level != level:
		user.level = level
		user.save()

	with connection.cursor() as cursor:
		cursor.execute("COMMIT;")
