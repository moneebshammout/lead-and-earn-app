from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

from .serializers import SignUPSerializer, SignInSerializer, PublicUserSerializer
from .models import CustomUser


@api_view(["POST"])
def signup(request):
    serializer = SignUPSerializer(data=request.data)
    if serializer.is_valid():
        user = CustomUser.objects.create_user(**serializer.validated_data)
        token = Token.objects.create(user=user)
        public_user_data = PublicUserSerializer(user).data
        return Response(
            {"token": token.key, "user": public_user_data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    user = get_object_or_404(CustomUser, email=request.data["email"])
    if not user.check_password(request.data["password"]):
        return Response("Wrong Password!", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = SignInSerializer(user)
    return Response({"token": token.key, "user": serializer.data})


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")
