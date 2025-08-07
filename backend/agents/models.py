from django.db import models

class Agent(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=[('idle', 'Idle'), ('busy', 'Busy')])
    last_active = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.role}"
