# Generated by Django 3.1.4 on 2021-01-04 13:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='checkin',
            new_name='check_in',
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='checkout',
            new_name='check_out',
        ),
    ]
