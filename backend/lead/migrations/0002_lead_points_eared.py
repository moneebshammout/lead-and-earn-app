# Generated by Django 4.2.4 on 2023-08-04 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lead', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='points_eared',
            field=models.IntegerField(default=0),
        ),
    ]
