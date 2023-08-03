from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication
from .authentication import ExpiringTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .serializers import SignUPSerializer, SignInSerializer, PublicUserSerializer
from .models import CustomUser, ExpirationToken
from .utils import generate_lead_on_user_creation


@api_view(["POST"])
def signup(request):
    """
    Creates a user and returns a token and user data,
    also it creates a lead if the user is created by referral link.
    """
    serializer = SignUPSerializer(data=request.data)
    if serializer.is_valid():
        request.data.get("source")
        user = CustomUser.objects.create_user(**serializer.validated_data)
        generate_lead_on_user_creation(user, request.data.get("source"))
        token = ExpirationToken.objects.create(user=user)
        public_user_data = PublicUserSerializer(user).data
        return Response(
            {"token": token.key, "user": public_user_data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    serializer = SignInSerializer(data=request.data)
    if serializer.is_valid():
        user = get_object_or_404(CustomUser, email=serializer.data["email"])
        if not user.check_password(request.data["password"]):
            return Response("Wrong Password!", status=status.HTTP_404_NOT_FOUND)

        token, created = ExpirationToken.objects.get_or_create_non_expired_token(
            user=user
        )
        public_user_data = PublicUserSerializer(user).data

        return Response({"token": token.key, "user": public_user_data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, ExpiringTokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")
