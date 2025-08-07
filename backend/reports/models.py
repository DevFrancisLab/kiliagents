from django.db import models
from django.conf import settings

class Report(models.Model):
    CATEGORY_CHOICES = [
        ('environment', 'Environmental'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category} - {self.user.username} ({self.submitted_at.date()})"
