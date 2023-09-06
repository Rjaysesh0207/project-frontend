from django.db import models

# Models are for setup template only. Change them according to the real project

class Vehicle(models.Model):
  make = models.CharField(max_length=50)
  model = models.CharField(max_length=50)
  year = models.PositiveIntegerField()
  mileage = models.PositiveIntegerField()
  vin = models.CharField(max_length=17, blank=True, null=True)

  def __str__(self):
    return f"{self.year}{self.make}{self.model}"
