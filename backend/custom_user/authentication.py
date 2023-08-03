from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from .models import ExpirationToken




class ExpiringTokenAuthentication(TokenAuthentication):
	"""
	Extend the TokenAuthentication class to add a check for the token's expiration.
	"""

	def get_model(self):
		if self.model is not None:
			return self.model
		return ExpirationToken
	
	def authenticate_credentials(self, key):
		model = self.get_model()
		try:
			token = model.objects.get(key=key)
		except model.DoesNotExist:
			raise AuthenticationFailed("Invalid token")
		if not token.user.is_active:
			raise AuthenticationFailed("User inactive or deleted")
		
		if token.is_expired():
			raise AuthenticationFailed("Token has expired")

		return token.user, token



