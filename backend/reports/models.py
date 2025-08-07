from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Report(models.Model):
    CATEGORY_CHOICES = [
        ('environment', 'Environmental'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.category}"
