# Generated by Django 3.1.4 on 2020-12-16 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0002_auto_20201213_2345'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='mapx',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='place',
            name='mapy',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
    ]
