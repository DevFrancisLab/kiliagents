from django.db import models
from agents.models import Agent

class IoTDevice(models.Model):
    DEVICE_TYPES = [
        ('air', 'Air Quality Sensor'),
        ('traffic', 'Traffic Sensor'),
        ('infra', 'Infrastructure Sensor'),
        ('water', 'Water Sensor'),
        ('gas', 'Gas Leak Detector'),
        ('panic_button', 'Panic Button'),
        ('camera', 'Camera Feed'),
        ('motion', 'Motion Sensor'),
    ]

    name = models.CharField(max_length=100)
    device_type = models.CharField(max_length=50, choices=DEVICE_TYPES)
    location = models.CharField(max_length=255, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    installed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.get_device_type_display()})"


class SensorReading(models.Model):
    device = models.ForeignKey(IoTDevice, on_delete=models.CASCADE, related_name="readings")
    timestamp = models.DateTimeField(auto_now_add=True)
    value = models.TextField(help_text="Can hold string, float, or JSON")
    handled_by = models.ForeignKey(Agent, null=True, blank=True, on_delete=models.SET_NULL)
    is_action_taken = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.device.name} @ {self.timestamp}"
