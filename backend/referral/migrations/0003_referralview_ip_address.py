# Generated by Django 4.2.4 on 2023-08-04 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referral', '0002_remove_referralview_viewer'),
    ]

    operations = [
        migrations.AddField(
            model_name='referralview',
            name='ip_address',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
