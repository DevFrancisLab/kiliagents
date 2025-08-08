from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id', 'user', 'category', 'content',
            'voice_file', 'video_file', 'image_file',
            'submitted_at', 'updated_at',
        ]
        read_only_fields = ['id', 'submitted_at', 'updated_at']
