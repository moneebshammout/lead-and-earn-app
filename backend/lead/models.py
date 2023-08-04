from django.db import models
from django.conf import settings
from referral.models import ReferralLink

User = settings.AUTH_USER_MODEL  # auth.User


class Lead(models.Model):
    id = models.AutoField(primary_key=True)
    refered_client = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    referral_link = models.ForeignKey(
        ReferralLink, null=True, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    points_earned = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.id}"


class LeadCategory(models.Model):
    id = models.AutoField(primary_key=True)
    leads_from = models.IntegerField(default=0, unique=True)
    leads_to = models.IntegerField(default=0, unique=True)
    points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"
