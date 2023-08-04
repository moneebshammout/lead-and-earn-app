from django.shortcuts import render
from rest_framework.decorators import (
    api_view,
)
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import ReferralLink, ReferralView


@api_view(["GET"])
def refer_client(request, pk=None):
    ## The ip address will always be the same in the local host
    viewer_ip=request.META.get('REMOTE_ADDR')
    link = get_object_or_404(ReferralLink, id=pk)
    ReferralView.objects.create(referral_link=link, ip_address=viewer_ip)
    return Response('Referral Viewed', status=status.HTTP_201_CREATED)
