from django.db import models
from django.contrib.auth.models import User

class Vehicle(models.Model):
  # The user field in your Vehicle model establishes a foreign key 
  # relationship with the default User model, 
  # which is part of Django's authentication system.
  # user = models.ForeignKey(User, on_delete=models.CASCADE) 
  make = models.CharField(max_length=50)
  model = models.CharField(max_length=50)
  year = models.PositiveIntegerField()
  mileage = models.PositiveIntegerField()
  vin = models.CharField(max_length=17, blank=True, null=True)

  def __str__(self):
    return f"{self.year}{self.make}{self.model}"
