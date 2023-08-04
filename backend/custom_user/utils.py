from django.db.models import Q
from custom_user.models import Level
from lead.models import Lead, LeadCategory
from referral.models import ReferralLink, ReferralView
from django.shortcuts import get_object_or_404
from django.db import connection
from django.db.models import F
from django.utils import timezone
from django.db.models import Sum
from datetime import timedelta


def generate_lead_on_user_creation(user, source=None):
    """
    Creates a lead when a user is created by refrral link.
    """
    if not source:
        return

    link = get_object_or_404(ReferralLink, id=source)
    lead = Lead.objects.create(refered_client=user, referral_link=link)

    update_user_points_and_level(link.owner, link, lead)


def update_user_points_and_level(user, link, lead):
    """
    Updates the user points and level when a lead is created.
    it takes advantage of Pessimistic locking to force other transactions to wait
    until the current transaction is finished.
    """

    with connection.cursor() as cursor:
        cursor.execute("BEGIN IMMEDIATE;")
        cursor.execute(
            """
			SELECT points, level_id,total_referrals
			FROM  CustomUser
			WHERE id = %s
			""",
            [user.id],
        )
        _ = (
            cursor.fetchone()
        )  # locking these three fields forcing the other transactions to wait elemenating race condition

    # updating user total referrals
    user.total_referrals += 1

    # updating user points
    lead_count = Lead.objects.filter(referral_link=link).count()
    lead_category = LeadCategory.objects.filter(
        Q(leads_from__lte=lead_count) & Q(leads_to__gte=lead_count)
    ).first()

    if not lead_category:
        user.save()
        return

    lead.points_earned = lead_category.points
    lead.save()

    user.points += lead_category.points

    # updating user level
    level = Level.objects.filter(
        Q(points_from__lte=user.points) & Q(points_to__gte=user.points)
    ).first()

    if level and user.level != level:
        user.level = level
    user.save()

    with connection.cursor() as cursor:
        cursor.execute("COMMIT;")


def get_referral_link_and_views(user):
    """
    gets the user referral link with unique and total views
    """
    referral_link = ReferralLink.objects.filter(owner=user).first()
    total_views = ReferralView.objects.filter(referral_link=referral_link).count()
    unique_views = (
        ReferralView.objects.filter(referral_link=referral_link)
        .values("ip_address")
        .annotate(min_id=F("id"))
        .values("min_id", "ip_address")
        .count()
    )

    return {
        "total_views": total_views,
        "unique_views": unique_views,
        "referral_link": referral_link.id,
    }


def get_total_points_earned_in_last_days(link, days=14):
    end_date = timezone.now()
    start_date = end_date - timedelta(days=days)
    date_points_mapping = {}
    current_date = start_date
    while current_date <= end_date:
        next_date = current_date + timedelta(days=1)

        # Calculate the total points for the current day
        total_points_earned = (
            Lead.objects.filter(
                referral_link=link,
                created_at__range=(current_date, next_date - timedelta(seconds=1)),
            ).aggregate(total_points=Sum("points_earned"))["total_points"]
            or 0
        )

        date_points_mapping[current_date.strftime("%Y-%m-%d")] = total_points_earned
        current_date = next_date

    return {
        "points_earned": date_points_mapping,
    }


def get_clients(user):
    """
    returns the user's clients and client of clients
    """
    referral_link = ReferralLink.objects.filter(owner=user).first()
    clients = Lead.objects.filter(referral_link=referral_link)
    client_info = [
        {"id": client.refered_client.id, "name": client.refered_client.name}
        for client in clients
    ]
    return client_info
