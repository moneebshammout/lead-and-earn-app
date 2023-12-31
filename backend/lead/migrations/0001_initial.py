# Generated by Django 4.2.4 on 2023-08-03 12:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('referral', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LeadCategory',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('leads_from', models.IntegerField(default=0, unique=True)),
                ('leads_to', models.IntegerField(default=0, unique=True)),
                ('points', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Lead',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('refered_client', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('referral_link', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='referral.referrallink')),
            ],
        ),
    ]
