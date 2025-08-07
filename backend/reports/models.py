from django.db import models
from users.models import CustomUser  # optional relation to a user

class Report(models.Model):
    CATEGORY_CHOICES = [
        ('electricity', 'Electricity'),
        ('water', 'Water'),
        ('security', 'Security'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    submitted_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.category})"

