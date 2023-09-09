from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token

    
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'

    # Create a string representation of the model so the output is something human
    def __str__(self):
        return self.email
    
    def get_auth_token(self):
        Token.objects.filter(user=self).delete()
        token = Token.objects.create(user=self)
        self.token = token.key
        self.save()
        return token.key

    def delete_token(self):
        Token.objects.filter(user=self).delete()
        self.token = None
        self.save()
        return self