# Generated by Django 2.2.13 on 2020-12-13 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='superhost',
        ),
    ]