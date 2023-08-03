from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from .validators import validate_file_size
from rest_framework.authtoken.models import Token
from django.conf import settings
import pytz
import datetime


class CustomUserManager(BaseUserManager):
		def create_user(self, email, password=None, **extra_fields):
				if not email:
						raise ValueError("The Email field must be set")

				email = self.normalize_email(email)
				user = self.model(email=email, **extra_fields)
				user.set_password(password)
				user.save(using=self._db)
				return user

		def create_superuser(self, email, password=None, **extra_fields):
				extra_fields.setdefault("is_staff", True)
				extra_fields.setdefault("is_superuser", True)

				if extra_fields.get("is_staff") is not True:
						raise ValueError("Superuser must have is_staff=True.")

				if extra_fields.get("is_superuser") is not True:
						raise ValueError("Superuser must have is_superuser=True.")

				extra_fields.pop("image", None)
				return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser):
		id = models.AutoField(primary_key=True)
		name = models.CharField(max_length=150)
		email = models.EmailField(unique=True)
		phone = models.CharField(max_length=15, unique=True)
		birthdate = models.DateTimeField(null=True)
		points = models.IntegerField(default=0)
		image = models.ImageField(
				upload_to="images/", null=True, blank=True, validators=[validate_file_size]
		)
		created_at = models.DateTimeField(auto_now_add=True)

		is_staff = models.BooleanField(default=False)
		is_active = models.BooleanField(default=True)
		is_superuser = models.BooleanField(default=False)

		USERNAME_FIELD = "email"
		REQUIRED_FIELDS = ["name", "phone", "image"]

		objects = CustomUserManager()

		def __str__(self):
				return self.email
			
		def has_perm(self, perm, obj=None):
				return self.is_superuser

		def has_module_perms(self, app_label):
				return self.is_superuser


"""
Table user {
	role varchar
	level_id integer TODO: add level table then append it here
}
"""


class ExpirationTokenManager(models.Manager):
		def get_expiray_queryset(self):
				utc_now = datetime.datetime.utcnow()
				utc_now = utc_now.replace(tzinfo=pytz.utc)
				expiration_time = utc_now - datetime.timedelta(
						seconds=settings.TOKEN_EXPIRATION_AFTER_SECONDS
				)
				return super().get_queryset().filter(created__gte=expiration_time)

		def get_or_create_non_expired_token(self, user):
				try:
						token = self.get_expiray_queryset().get(user=user)
						return token, False
				except ExpirationToken.DoesNotExist:
						old_token = self.get(user=user)
						if old_token:
								old_token.delete()

						token = self.create(user=user)
						return token, True


class ExpirationToken(Token):
		"""
		Extend the Token model to add a check for the token's expiration.
		"""

		def is_expired(self):
				utc_now = datetime.datetime.utcnow()
				utc_now = utc_now.replace(tzinfo=pytz.utc)
				if self.created < utc_now - datetime.timedelta(
						seconds=settings.TOKEN_EXPIRATION_AFTER_SECONDS
				):
						return True
				return False

		objects = ExpirationTokenManager()
