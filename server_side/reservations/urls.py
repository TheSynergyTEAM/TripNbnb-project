from django.urls import path
from . import views

app_name = "reservations"

urlpatterns = [
    path("place/<int:id>/", views.reservation_check, name = "check"),
    path("place/test/<int:id>/", views.reservation_check_test, name = "check"),
    path("place/create/", views.reservation_confirm, name = "create")
]
