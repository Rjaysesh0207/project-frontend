from rest_framework import viewsets, status
from rest_framework.response import Response
# serializers transforms data to JSON
from ..serializers import VehicleSerializer
from ..models.vehicle import Vehicle

class VehicleView(viewsets.ModelViewSet):
  serializer_class = VehicleSerializer
  queryset = Vehicle.objects.all()


