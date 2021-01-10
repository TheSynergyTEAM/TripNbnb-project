from django.urls import path
from . import views

app_name = "reservations"

urlpatterns = [
    path("<int:id>/", views.reservation_confirm, name="place"),
]
