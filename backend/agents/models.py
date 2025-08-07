from django.db import models

class Agent(models.Model):
    AGENT_TYPES = [
        ('development', 'Development'),
        ('environment', 'Environment'),
        ('social', 'Social Cohesion'),
        ('sme', 'SME Support'),
        ('safety', 'Safety'),
    ]

    name = models.CharField(max_length=100)
    agent_type = models.CharField(max_length=50, choices=AGENT_TYPES)
    description = models.TextField()
    active = models.BooleanField(default=True)
    last_heartbeat = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.get_agent_type_display()})"
