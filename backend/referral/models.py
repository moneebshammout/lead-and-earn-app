from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL  # auth.User


class ReferralLink(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.id}"
    
  
class ReferralView(models.Model):
	id = models.AutoField(primary_key=True)
	referral_link = models.ForeignKey(ReferralLink, null=True, on_delete=models.SET_NULL)
	ip_address = models.CharField(max_length=50, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
 
	def __str__(self):
		return f"{self.id}"
