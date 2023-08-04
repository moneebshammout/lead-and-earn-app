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

from .serializers import (
    SignUPSerializer,
    SignInSerializer,
    PublicUserSerializer,
    UserDashboardSerializer,
)
from .models import CustomUser, ExpirationToken
from .utils import (
    generate_lead_on_user_creation,
    get_referral_link_and_views,
    get_total_points_earned_in_last_days,
    get_clients,
)


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
def dashboard(request):
    """
    Returns the user's Dashboard data .
    referral link unique and total views
    total points earned
    referral link
    total points earned during the last 14 days
    """
    user = request.user

    userData = UserDashboardSerializer(user).data
    referral_link_views = get_referral_link_and_views(user)
    total_points_earned_in_last_days = get_total_points_earned_in_last_days(
        referral_link_views["referral_link"]
    )
    respponse_data = userData
    respponse_data.update(referral_link_views)
    respponse_data.update(total_points_earned_in_last_days)

    return Response(respponse_data)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, ExpiringTokenAuthentication])
@permission_classes([IsAuthenticated])
def my_clients(request, pk=None):
    """
    return the user's clients
    """
    user = get_object_or_404(CustomUser, id=pk)
    data = get_clients(user)
    return Response(data)
