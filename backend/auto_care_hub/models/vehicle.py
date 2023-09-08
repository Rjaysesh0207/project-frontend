from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.authtoken.models import Token




  # When User.objects is called (ex: objects.all())make sure to use custom user manager 


class Vehicle(models.Model):
  
  make = models.CharField(max_length=50)
  model = models.CharField(max_length=50)
  year = models.PositiveIntegerField()
  mileage = models.PositiveIntegerField()
  vin = models.CharField(max_length=17, blank=True, null=True)
  # get_user_model ensures I get my User from settings.py 
  


  def __str__(self):
    return f"{self.year}{self.make}{self.model}{self.vin}"
  


# class Jobs(models.Model):
  # title
  # date
  # parts
  # cost
  # completed
  # Eventually there will be a vehicle = models.ForeignKey('Vehicle', related_name='jobs', on_delete=models.CASCADE)