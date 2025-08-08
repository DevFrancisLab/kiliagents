# reports/models.py
from django.db import models
from django.conf import settings

class Report(models.Model):
    CATEGORY_CHOICES = [
        ('environment', 'Environmental'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('other', 'Other'),

        # Added new categories from your suggestion for future use
        ('urban', 'Urban Development'),
        ('sme', 'SME Support'),
        ('social', 'Social Cohesion'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)  # Allow blank for backward compatibility
    content = models.TextField(blank=True)      # New field for flexible text content

    voice_file = models.FileField(upload_to='reports/voice/', null=True, blank=True)
    video_file = models.FileField(upload_to='reports/video/', null=True, blank=True)
    image_file = models.ImageField(upload_to='reports/images/', null=True, blank=True)

    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category} - {self.user.username} ({self.submitted_at.date()})"
