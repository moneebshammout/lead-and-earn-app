from django.apps import AppConfig
from django.db.models.signals import post_migrate
from .seeds import create_initial_lead_category

class LeadConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'lead'

    
    def ready(self):
        post_migrate.connect(create_initial_lead_category, sender=self)