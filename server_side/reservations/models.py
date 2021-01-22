from django.db import models
from core import models as core_models

# Create your models here.


class Reservation(models.Model):
    """Reservation Model Definition"""

    ROOM_SINGLE = "Single",
    ROOM_DOUBLE = "Double",
    ROOM_TWIN = "Twin",
    ROOM_TRIPLE = "Triple",
    ROOM_SUITE = "Suite",

    ROOM_TYPE = (
        ("ROOM_SINGLE", "Single"),
        ("ROOM_DOUBLE", "Double"),
        ("ROOM_TWIN", "Twin"),
        ("ROOM_TRIPLE", "Triple"),
        ("ROOM_SUITE", "Suite"),
    )

    hotel = models.ForeignKey("places.Place",
                              related_name = "reservation",
                              on_delete = models.CASCADE)
    guest = models.ForeignKey("users.User",
                              related_name = "reservation",
                              on_delete = models.CASCADE)
    price = models.IntegerField()
    room_type = models.CharField(choices = ROOM_TYPE, max_length = 30)
    check_in = models.DateField()
    check_out = models.DateField()
    is_reserved = models.BooleanField(default = False)
    number_of_people = models.PositiveIntegerField()

#   def __str__(self):
#       return self.name
