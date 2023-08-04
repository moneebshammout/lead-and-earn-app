from django.urls import path
from . import views

urlpatterns = [
    path("auth/signup", views.signup),
    path("auth/login", views.login),
    path("user/dashboard", views.dashboard),
    path("user/clients/<int:pk>/", views.my_clients),
]
