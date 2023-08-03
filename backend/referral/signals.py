from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import ReferralLink

User = settings.AUTH_USER_MODEL  # auth.User


@receiver(post_save, sender=User)
def create_referral_link(sender, instance, created, **kwargs):
    if created:
        try:
            ReferralLink.objects.create(owner=instance)
        except:
            raise Exception(f"Cannot create referral link for user {instance.email}")
