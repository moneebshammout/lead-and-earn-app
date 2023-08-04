from rest_framework import serializers
from django.conf import settings
from custom_user.models import CustomUser, Level


class UserSerializer(serializers.ModelSerializer):
    total_points = serializers.SerializerMethodField()
    registration_date = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "name",
            "email",
            "registration_date",
            "total_points",
            "total_referrals",
            "phone",
            "birthdate",
            "image",
            "role",
        )

    def get_total_points(self, obj):
        return obj.points

    def get_registration_date(self, obj):
        return obj.created_at


class LevelSerializer(serializers.ModelSerializer):
    total_users = serializers.SerializerMethodField()

    def get_total_users(self, level):
        return CustomUser.objects.filter(level=level).count()

    class Meta:
        model = Level
        fields = ("badge", "total_users")
