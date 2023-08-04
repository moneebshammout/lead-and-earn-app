from django.urls import path
from .views import UserListView,system_overview


urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("system/", system_overview, name="system-detail"),
]
