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


class PlaceType(AbstractItem): #장소 정보(숙박, 관광지...)
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
    contentid = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=100)
    mapx = models.CharField(max_length=50)
    mapy = models.CharField(max_length=50)
    place_img = models.ImageField(upload_to="place_imgs", blank=True)

    def __str__(self):
        return self.name