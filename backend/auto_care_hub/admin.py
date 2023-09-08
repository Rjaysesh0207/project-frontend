from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models.user import User
from .models.vehicle import Vehicle
# Register your models here.

class UserAdmin(BaseUserAdmin):
  ordering = ['id']
  list_display = ['id', 'email', 'is_superuser', 'last_login']


admin.site.register(Vehicle)
admin.site.register(User, UserAdmin)