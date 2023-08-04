# permissions.py
from rest_framework.permissions import BasePermission


class IsAdminOrNotAuthorized(BasePermission):
    def has_permission(self, request, view):
        # Allow all methods for admin users
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )
