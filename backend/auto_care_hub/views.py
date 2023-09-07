from rest_framework import viewsets, status
from rest_framework.response import Response
# serializers transforms data to JSON
from .serializers import VehicleSerializer, UserSerializer
from .models import Vehicle, User

class VehicleView(viewsets.ModelViewSet):
  serializer_class = VehicleSerializer
  queryset = Vehicle.objects.all()


class SignupView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # ensure the password is hashed
    def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.save()
      user.set_password(request.data.get('password'))
      user.save()
      return Response({'message': 'User successfully registered'}, status=status.HTTP_201_CREATED)
