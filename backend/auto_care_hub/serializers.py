from rest_framework import serializers
from .models import Vehicle, User

class VehicleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vehicle
    fields = ('id', 'make', 'model', 'year', 'mileage', 'vin')

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')

    # password will only be used for input during registration not included in response
    extra_kwargs = {'password': {'write_only': True}}