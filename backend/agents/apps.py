from django.apps import AppConfig
from django.db.models.signals import post_migrate

class AgentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'agents'

    def ready(self):
        from . import signals  # This triggers our post_migrate logic
