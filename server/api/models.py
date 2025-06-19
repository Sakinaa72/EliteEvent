from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_admin=models.BooleanField(default=False)
    
class Tag(models.Model):
    name=models.CharField(max_length=20)
    
    def __str__(self):
        return self.name
    
class Event(models.Model):
    title=models.CharField(max_length=20)
    description=models.TextField()
    date=models.DateField()
    organizer=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tags=models.ManyToManyField(Tag)
    
    def __str__(self):
        return self.title
    
class Registration(models.Model):
    user=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event=models.ForeignKey(Event, on_delete=models.CASCADE)
    registered_on=models.DateTimeField(auto_now_add=True)
    
class Feedback(models.Model):
    event=models.ForeignKey(Event, on_delete=models.CASCADE)
    user=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment=models.TextField()
    rating=models.PositiveIntegerField()
    
