from django.shortcuts import render
from rest_framework import viewsets
# serializer and model import name will be different depending on my app
from .serializers import VehicleSerializer
from .models import Vehicle

# View will be different depending on my app
class VehicleView(viewsets.ModelViewSet):
  serializer_class = VehicleSerializer
  queryset = Vehicle.objects.all()