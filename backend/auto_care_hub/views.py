from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user, authenticate, login, logout

from .serializers import UserSerializer, UserRegisterSerializer,  ChangePasswordSerializer, VehicleSerializer
from .models import User, Vehicle

class SignUpView(generics.CreateAPIView):
    # Override the authentication/permissions classes so this endpoint
    # is not authenticated & we don't need any permissions to access it.
    authentication_classes = ()
    permission_classes = ()

    # Serializer classes are required for endpoints that create data
    serializer_class = UserRegisterSerializer

    def post(self, request):
        # Pass the request data to the serializer to validate it
        user = UserRegisterSerializer(data=request.data['credentials'])
        # If that data is in the correct format...
        if user.is_valid():
            # Actually create the user using the UserSerializer (the `create` method defined there)
            created_user = UserSerializer(data=user.data)

            if created_user.is_valid():
                # Save the user and send back a response!
                created_user.save()
                created_user.instance.get_auth_token()
                return Response({ 'user': created_user.data }, status=status.HTTP_201_CREATED)
            else:
                return Response(created_user.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

class SignInView(generics.CreateAPIView):
    # Override the authentication/permissions classes so this endpoint
    # is not authenticated & we don't need any permissions to access it.
    authentication_classes = ()
    permission_classes = ()

    # Serializer classes are required for endpoints that create data
    serializer_class = UserSerializer

    def post(self, request):
        creds = request.data['credentials']
        print(creds)
        # We can pass our email and password along with the request to the
        # `authenticate` method. If we had used the default user, we would need
        # to send the `username` instead of `email`.
        user = authenticate(request, email=creds['email'], password=creds['password'])
        # Is our user is successfully authenticated...
        if user is not None:

            # And they're active...
            if user.is_active:
                # Log them in!
                login(request, user)
                # Finally, return a response with the user's token
                return Response({
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'token': user.get_auth_token()
                    }
                })
            else:
                return Response({ 'msg': 'The account is inactive.' }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({ 'msg': 'The username and/or password is incorrect.' }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SignOutView(generics.DestroyAPIView):
    def delete(self, request):
        # Remove this token from the user
        request.user.delete_token()
        # Logout will remove all session data
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class ChangePasswordView(generics.UpdateAPIView):
    def partial_update(self, request):
        user = request.user
        # Pass data through serializer
        serializer = ChangePasswordSerializer(data=request.data['passwords'])
        if serializer.is_valid():
            # This is included with the Django base user model
            # https://docs.djangoproject.com/en/3.2/ref/contrib/auth/#django.contrib.auth.models.User.check_password
            if not user.check_password(serializer.data['old']):
                return Response({ 'msg': 'Wrong password' }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            # set_password will also hash the password
            # https://docs.djangoproject.com/en/3.2/ref/contrib/auth/#django.contrib.auth.models.User.set_password
            user.set_password(serializer.data['new'])
            user.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class VehicleView(generics.ListCreateAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = VehicleSerializer
    def get(self, request):
        """Index request"""
        # Get all the vehicles:
        # vehicles = Vehicle.objects.all()
        # Filter the mangos by owner, so you can only see your owned mangos
        vehicles = Vehicle.objects.filter(owner=request.user.id)
        # Run the data through the serializer
        data = VehicleSerializer(vehicles, many=True).data
        return Response({ 'vehicles': data })

    def post(self, request):
        """Create request"""
        # Add user to request data object
        request.data['vehicle']['owner'] = request.user.id
        # Serialize/create vehicle
        vehicle = VehicleSerializer(data=request.data['vehicle'])
        # If the vehicle data is valid according to our serializer...
        if vehicle.is_valid():
            # Save the created vehicle & send a response
            vehicle.save()
            return Response({ 'vehicle': vehicle.data }, status=status.HTTP_201_CREATED)
        # If the data is not valid, return a response with the errors
        return Response(vehicle.errors, status=status.HTTP_400_BAD_REQUEST)

class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=(IsAuthenticated,)
    def get(self, request, pk):
        """Show request"""
        # Locate the vehicle to show
        vehicle = get_object_or_404(Vehicle, pk=pk)
        # Only want to show owned vehicles?
        if request.user != vehicle.owner:
            raise PermissionDenied('Unauthorized, you do not own this vehicle')

        # Run the data through the serializer so it's formatted
        data = VehicleSerializer(vehicle).data
        return Response({ 'vehicle': data })

    def delete(self, request, pk):
        """Delete request"""
        # Locate vehicle to delete
        vehicle = get_object_or_404(Vehicle, pk=pk)
        # Check the vehicle's owner against the user making this request
        if request.user != vehicle.owner:
            raise PermissionDenied('Unauthorized, you do not own this vehicle')
        # Only delete if the user owns the  vehicle
        vehicle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk):
        """Update Request"""
        # Locate Vehicle
        # get_object_or_404 returns a object representation of the Vehicle
        vehicle = get_object_or_404(Vehicle, pk=pk)
        # Check the vehicle's owner against the user making this request
        if request.user != vehicle.owner:
            raise PermissionDenied('Unauthorized, you do not own this vehicle')

        # Ensure the owner field is set to the current user's ID
        request.data['vehicle']['owner'] = request.user.id
        # Validate updates with serializer
        data = VehicleSerializer(vehicle, data=request.data['vehicle'], partial=True)
        if data.is_valid():
            # Save & send a 204 no content
            data.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        # If the data is not valid, return a response with the errors
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)