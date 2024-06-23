from rest_framework import serializers
from FileHandlerApp.models import FileHandler
from django.utils import timezone

class FileHandlerSerializer(serializers.ModelSerializer):
    uploaded_at= serializers.DateTimeField(read_only=True)
    class Meta:
        model=FileHandler
        fields= '__all__'

        def update(self,instance, validated_data):
            instance.uploaded_at = timezone.now()
            return super().update(instance,validated_data)