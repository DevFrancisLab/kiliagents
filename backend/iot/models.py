from django.db import models

class SensorData(models.Model):
    device_id = models.CharField(max_length=100)
    data_type = models.CharField(max_length=50)  # e.g., temperature, smoke, motion
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device_id} - {self.data_type}: {self.value}"

