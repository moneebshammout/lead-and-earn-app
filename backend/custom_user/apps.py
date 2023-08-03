from django.apps import AppConfig
from django.db.models.signals import post_migrate
from .seeds import create_initial_levels

class CustomUserConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "custom_user"
    
    def ready(self):
        post_migrate.connect(create_initial_levels, sender=self)
