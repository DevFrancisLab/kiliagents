from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Agent

@receiver(post_migrate)
def create_default_agents(sender, **kwargs):
    if sender.name == "agents":
        default_agents = [
            {"name": "Vision AI", "role": "Image Processing", "status": "active"},
            {"name": "Speech AI", "role": "Voice Recognition", "status": "active"},
            {"name": "TextBot", "role": "Natural Language", "status": "inactive"},
        ]
        for agent_data in default_agents:
            Agent.objects.get_or_create(name=agent_data["name"], defaults=agent_data)
