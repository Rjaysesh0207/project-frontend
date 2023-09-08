from rest_framework import serializers
from .models.vehicle import Vehicle
from .models.user import User

class VehicleSerializer(serializers.ModelSerializer):
  # Eventually I will have a jobs = JobSerializer(many=True), jobs is the name to be used for 'related_name' for the foreign key 
  class Meta:
    model = Vehicle

    # I am sending back ID, make model year mileage and vin
    fields = ('__all__')



# class JobSerializer(serializers.ModelSerializer):
  # class Meta:
    # model = Job
    # fields = '__all__'