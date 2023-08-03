# Generated by Django 4.2.4 on 2023-08-03 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('custom_user', '0004_alter_customuser_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('badge', models.CharField(max_length=50)),
                ('points_from', models.IntegerField(default=0, unique=True)),
                ('points_to', models.IntegerField(default=0, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='customuser',
            name='level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='custom_user.level'),
        ),
    ]
