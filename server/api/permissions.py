from rest_framework.permissions import BasePermission
from .models import Registration

class IsAdminUser(BasePermission):
    # Custom user with is_admin True 
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin
    
class IsRegisteredUser(BasePermission):
    # Allow access only to users who are registered for the event 
    def has_permission(self, request, view):
        event_id=view.kwargs.get('pk')
        user=request.user
        return Registration.objects.filter(event__id = event_id, user=user).exists()
        