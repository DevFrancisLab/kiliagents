from django.db import models
from django.conf import settings

class Alert(models.Model):
    CATEGORY_CHOICES = [
        ('environment', 'Environment'),
        ('security', 'Security'),
        ('infrastructure', 'Infrastructure'),
        ('social', 'Social'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    message = models.TextField()
    triggered_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category.upper()}: {self.message[:50]}"
