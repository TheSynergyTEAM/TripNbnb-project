from django.contrib import admin
from .models import Review

# Register your models here.
@admin.register(Review)
class CustomReviewAdmin(admin.ModelAdmin):
    """Custom Review Admin"""

    list_display = (
        "place",
        "rating",
        "user",
    )
    list_filter = (
        "rating",
        "place",
    )