from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Agent

@receiver(post_migrate)
def create_default_agents(sender, **kwargs):
    if sender.name == "agents":
        defaults = [
            {"name": "Coordinator Agent", "role": "coordinator", "status": "active"},
            {"name": "Environmental Agent", "role": "environmental", "status": "active"},
            {"name": "Security Agent", "role": "security", "status": "active"},
        ]
        for agent_data in defaults:
            Agent.objects.get_or_create(
                role=agent_data["role"], defaults=agent_data
            )
