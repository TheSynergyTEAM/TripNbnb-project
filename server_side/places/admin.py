from django.contrib import admin
from .models import Place

@admin.register(Place)
class CustomPlaceAdmin(admin.ModelAdmin):
    """CUstom Place Admin"""

    list_filter = (
        "name",
        "city",
    )
    list_display = (
        "name",
        "city",
        "address",
    )