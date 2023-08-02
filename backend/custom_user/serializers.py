from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class SignUPSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "birthdate",
            # "image",
            "password"
        ]


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
            "is_active"
        ]