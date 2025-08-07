from django.db import models

class Agent(models.Model):
    AGENT_ROLE_CHOICES = [
        ('alert_handler', 'Alert Handler'),
        ('report_generator', 'Report Generator'),
        ('sensor_monitor', 'Sensor Monitor'),
    ]

    AGENT_STATUS_CHOICES = [
        ('idle', 'Idle'),
        ('active', 'Active'),
        ('error', 'Error'),
    ]

    name = models.CharField(max_length=100, unique=True)
    role = models.CharField(max_length=50, choices=AGENT_ROLE_CHOICES)
    status = models.CharField(max_length=20, choices=AGENT_STATUS_CHOICES, default='idle')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"
