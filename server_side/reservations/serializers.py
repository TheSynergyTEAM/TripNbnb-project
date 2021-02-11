from rest_framework import serializers
from . import models

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = (
            "hotel",
            "guest",
            "price",
            "check_in",
            "check_out",
            "number_of_people",
        )
