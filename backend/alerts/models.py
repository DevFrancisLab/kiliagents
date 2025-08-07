from django.db import models
from agents.models import Agent
from iot.models import SensorData

class Alert(models.Model):
    LEVEL_CHOICES = [
        ('info', 'Info'),
        ('warning', 'Warning'),
        ('critical', 'Critical'),
    ]

    title = models.CharField(max_length=100)
    message = models.TextField()
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    triggered_by = models.ForeignKey(SensorData, on_delete=models.CASCADE)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.level.upper()} - {self.title}"
