from django.db import models
from core import models as core_models

# Create your models here.
class AbstractItem(core_models.TimeStampedModel):
    """ Abstract Item """

    name = models.CharField(max_length=50)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class PlaceType(AbstractItem):
    """ PlaceType Model Definition """

    class Meta:
        verbose_name = "PlaceType"


class Photo(core_models.TimeStampedModel):
    """Photo Model Definition"""

    title = models.CharField(max_length=50)
    file = models.ImageField(upload_to="")
    place = models.ForeignKey("Place", related_name="photos", on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Place(core_models.TimeStampedModel):
    """Place Model Definition"""

    name = models.CharField(max_length=200)
    description = models.TextField()
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    writer = models.ForeignKey(
        "users.User", related_name="place", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name