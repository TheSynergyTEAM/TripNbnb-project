from rest_framework import serializers
from . import models

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = (
            "room",
            "guest",
            "price",
            "check_in",
            "check_out",
            "is_reserved",
            "number_of_people",
        )
