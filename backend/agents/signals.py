from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Agent

@receiver(post_migrate)
def create_default_agents(sender, **kwargs):
    if sender.name == "agents":
        defaults = [
            {"name": "Coordinator Agent", "agent_type": "coordinator", "active": True},
            {"name": "Environmental Agent", "agent_type": "environmental", "active": True},
            {"name": "Security Agent", "agent_type": "security", "active": True},
        ]
        for agent_data in defaults:
            Agent.objects.get_or_create(
                agent_type=agent_data["agent_type"], defaults=agent_data
            )
