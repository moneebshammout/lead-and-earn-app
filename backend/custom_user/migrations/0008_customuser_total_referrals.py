# Generated by Django 4.2.4 on 2023-08-04 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custom_user', '0007_customuser_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='total_referrals',
            field=models.IntegerField(default=0),
        ),
    ]
