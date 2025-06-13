from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority',
            'status_display', 'priority_display',
            'due_date', 'created_at', 'modified_at'
        ]
        read_only_fields = ['created_at', 'modified_at', 'id']
