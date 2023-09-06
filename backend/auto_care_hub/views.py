from django.shortcuts import render
from rest_framework import viewsets
# serializer and model import name will be different depending on my app
from .serializers import TodoSerializer
from .models import Todo

# View will be different depending on my app
class TodoView(viewsets.ModelViewSet):
  serializer_class = TodoSerializer
  queryset = Todo.objects.all()