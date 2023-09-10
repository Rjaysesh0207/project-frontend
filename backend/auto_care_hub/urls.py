from django.urls import path
from .views import VehicleView, VehicleDetailView, SignUpView, SignInView, SignOutView, ChangePasswordView
urlpatterns = [
  	# Restful routing
    path('vehicles/', VehicleView.as_view(), name='vehicles'),
    path('vehicle/<int:pk>/', VehicleDetailView.as_view(), name='vehicle_detail'),
    path('sign-up/', SignUpView.as_view(), name='sign-up'),
    path('sign-in/', SignInView.as_view(), name='sign-in'),
    path('sign-out/', SignOutView.as_view(), name='sign-out'),
    path('change-pw/', ChangePasswordView.as_view(), name='change-pw')
]