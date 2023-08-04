from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework import generics
from django_filters import rest_framework as filters
from custom_user.authentication import ExpiringTokenAuthentication
from custom_user.models import CustomUser, Level
from .serializers import UserSerializer, LevelSerializer
from django.db.models import Q, Sum
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from .permissions import IsAdminOrNotAuthorized

class UserFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_name_or_email_starts_with")

    class Meta:
        model = CustomUser
        fields = [
            "name",
            "email",
            "created_at",
            "points",
            "total_referrals",
            "id",
        ]
        ordering_fields = ["name", "email", "created_at", "points", "total_referrals"]

    def filter_name_or_email_starts_with(self, queryset, name, value):
        return queryset.filter(Q(name__istartswith=value) | Q(email__istartswith=value))


class UserListView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [IsAuthenticated,IsAdminOrNotAuthorized]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filterset_class = UserFilter
    filter_backends = (filters.DjangoFilterBackend,)

    def get_queryset(self):
        # Only include users with role='user'
        queryset = CustomUser.objects.filter(role="user")
        return queryset

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            return queryset.order_by(ordering)

        return queryset


@api_view(["GET"])
@authentication_classes([SessionAuthentication, ExpiringTokenAuthentication])
@permission_classes([IsAuthenticated,IsAdminOrNotAuthorized])
def system_overview(request):
    """
    gets total users
    gets total points
    gets user distribution across levels
    """
    total_users = CustomUser.objects.all().count()
    total_points = CustomUser.objects.all().aggregate(Sum("points"))
    levels_data = LevelSerializer(Level.objects.all(), many=True).data

    response_data = {
        "total_users": total_users,
        "total_points": total_points['points__sum'],
        "levels_summary": levels_data,
    }

    return Response(response_data)
