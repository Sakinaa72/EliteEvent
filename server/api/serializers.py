from rest_framework import serializers
from .models import CustomUser, Tag, Feedback, Event, Registration

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','username','email','password']
        
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tag
        fields = '__all__'
        
class EventSerializer(serializers.ModelSerializer):
    organizer=serializers.ReadOnlyField(source='organizer.user.name')
    tags=TagSerializer(many=True, read_only=True)
    
    class Meta:
        model=Event
        fields=['id','title','description','date','organizer','tags']
        
class RegistrationSerializer(serializers.ModelSerializer):
    event=EventSerializer(read_only=True)
    class Meta:
        model=Registration
        fields=['id','user','event','registered_on']
        read_only_fields = ['user', 'registered_on']
        
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields=['id','event','user','comment','rating']
        read_only_fields = ['user','event']
        