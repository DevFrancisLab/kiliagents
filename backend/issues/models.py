from django.db import models

class Issue(models.Model):
    CATEGORY_CHOICES = [
        ('development', 'Development'),
        ('environment', 'Environment'),
        ('social', 'Social Cohesion'),
        ('sme', 'SME Support'),
        ('safety', 'Safety'),
    ]
    
    STATUS_CHOICES = [
        ('reported', 'Reported'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='reported')
    proof = models.ImageField(upload_to='issue_proofs/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_category_display()} issue at ({self.latitude}, {self.longitude})"
