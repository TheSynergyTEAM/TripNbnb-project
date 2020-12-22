from rest_framework import serializers
from . import models


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.List
        fields = (
            "name",
            "user",
            "places",
        )
