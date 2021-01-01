from django.contrib import admin
from .models import Place

@admin.register(Place)
class CustomPlaceAdmin(admin.ModelAdmin):
    """CUstom Place Admin"""

    fieldsets = (
        ("Custom field", {
            "fields": (
                "name",
                "contentid",
                "city",
                "address",
                "mapx",
                "mapy",
                "place_img",
            ),
        }),
    )

    list_filter = (
        "name",
        "city",
    )
    list_display = (
        "contentid",
        "name",
        "city",
        "address",
    )