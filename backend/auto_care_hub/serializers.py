from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models.vehicle import Vehicle
from .models.user import User

class VehicleSerializer(serializers.ModelSerializer):
  # Eventually I will have a jobs = JobSerializer(many=True), jobs is the name to be used for 'related_name' for the foreign key 
  class Meta:
    model = Vehicle

    # I am sending back ID, make model year mileage and vin
    fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # get_user_model will get the user model 
        model = get_user_model()
        fields = ('id', 'email', 'password')
        extra_kwargs = { 'password': { 'write_only': True, 'min_length': 5 } }

    # this create method will be used to create user model
    def create(self, validated_data):
        # TODO: make sure model defines create_user
        return get_user_model().objects.create_user(**validated_data)

# class JobSerializer(serializers.ModelSerializer):
  # class Meta:
    # model = Job
    # fields = '__all__'