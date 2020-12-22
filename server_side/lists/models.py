from django.db import models
from core import models as core_models

# Create your models here.


class List(core_models.TimeStampedModel):
    name = models.CharField(max_length=80)
    user = models.ForeignKey(
        "users.User", related_name="list", on_delete=models.CASCADE
    )
    places = models.ManyToManyField("places.Place", related_name="list", blank=True)

    def count_places(self):
        return self.places.count()

    count_places.short_description = "Number of places"
