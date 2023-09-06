from rest_framework import serializers
# import name will change depending on my model for my project 
from .models import Todo

# Again, name will change depending on my model for my project
class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')