from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models

# Register your models here.
@admin.register(models.User)
class CustomUserAdmin(UserAdmin):
    """CUstom User Admin"""

    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Profile",
            {
                "fields": (
                    "profile_img",
                    "gender",
                    "biography",
                    "birthdate",
                )
            },
        ),
    )

    list_filter = UserAdmin.list_filter
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
        "gender",
        "biography",
        "birthdate",
        "is_staff",
        "is_superuser",
    )