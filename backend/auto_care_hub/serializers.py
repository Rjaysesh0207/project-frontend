from rest_framework import serializers
# import name will change depending on my model for my project 
from .models import Vehicle

# Again, name will change depending on my model for my project
class VehicleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vehicle
    fields = ('id', 'make', 'model', 'year', 'mileage', 'vin')