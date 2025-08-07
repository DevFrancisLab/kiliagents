from django.db import models

class Agent(models.Model):
    ROLE_CHOICES = [
        ('coordinator', 'Coordinator Agent'),
        ('environmental', 'Environmental Agent'),
        ('security', 'Security Agent'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"
