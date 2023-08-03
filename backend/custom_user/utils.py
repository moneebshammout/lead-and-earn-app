from lead.models import Lead
from referral.models import ReferralLink
from django.shortcuts import get_object_or_404


def generate_lead_on_user_creation(user, source=None):
    """
    Creates a lead when a user is created by refrral link.
    """

    if not source:
        return

    link = get_object_or_404(ReferralLink, id=source)
    Lead.objects.create(refered_client=user, referral_link=link)
    # add logic for the user points to be refreshed using pessmistic locking and also updating user level
