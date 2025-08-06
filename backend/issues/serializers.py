from rest_framework import serializers
from .models import Issue

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['id', 'description', 'latitude', 'longitude', 'category', 'status', 'proof', 'created_at', 'updated_at']
