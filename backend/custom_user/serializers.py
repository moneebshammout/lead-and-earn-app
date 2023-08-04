from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class SignUPSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    role = serializers.CharField(default="user")
    class Meta:
        model = CustomUser
        fields = [
            "name",
            "email",
            "phone",
            "birthdate",
            "image",
            "password",
            "role"
        ]

    def validate(self, data):
        # Check if the user is a superuser and validate the 'image' field accordingly
        is_superuser = data.get("is_superuser", False)

        if not is_superuser and not data.get("image"):
            raise serializers.ValidationError("image is required!")

        return data


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(email=email, password=password)

            if not user:
                raise serializers.ValidationError(
                    "Invalid credentials. Please try again."
                )

            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")

            data["user"] = user
        else:
            raise serializers.ValidationError('Must include "email" and "password".')

        return data


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "birthdate",
            "image",
            "points",
            "is_active",
            "created_at",
            "role"
        ]
