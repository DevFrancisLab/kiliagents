from django.db import models
from agents.models import Agent

class SensorData(models.Model):
    SENSOR_TYPES = [
        ('temperature', 'Temperature'),
        ('humidity', 'Humidity'),
        ('gas', 'Gas Leak'),
        ('panic_button', 'Panic Button'),
        ('motion', 'Motion Sensor'),
        ('camera', 'Camera Feed'),
    ]

    sensor_type = models.CharField(max_length=50, choices=SENSOR_TYPES)
    value = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=100, blank=True, null=True)
    handled_by = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.sensor_type} @ {self.timestamp}"
