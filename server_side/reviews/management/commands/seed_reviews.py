import random
from django.core.management.base import BaseCommand
from django_seed import Seed 
from reviews import models as review_models
from users import models as user_models
from places import models as place_models

class Command(BaseCommand):

    help = "This command creates reviews"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number", default=2, type=int, help="How many reviews you want to create?"
        )
    
    def handle(self, *args, **options):
        number = options.get("number")
        seeder = Seed.seeder()
        users = user_models.User.objects.all()
        places = place_models.Place.objects.all()
        seeder.add_entity(
            review_models.Review,
            number,
            {
                "place": lambda x: random.choice(places),
                "user": lambda x: random.choice(users),
                "rating": lambda x: random.randint(0,6),
            },
        )
        seeder.execute()
        self.stdout.write(self.style.SUCCESS(f"{number} reviews created"))