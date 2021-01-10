from django.contrib import admin
from .models import Reservation

# Register your models here.

@admin.register(Reservation)
class CustomReviewAdmin(admin.ModelAdmin):
    """Custom Review Admin"""

    list_display = (
        "hotel",
        "guest",
        "room_type",
        "check_in",
        "check_out",
        "number_of_people",
    )
    list_filter = (
        "hotel",
        "room_type",
        "check_in",
        "number_of_people",
    )