# Generated by Django 4.2.4 on 2023-08-02 23:08

import custom_user.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custom_user', '0003_alter_customuser_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/', validators=[custom_user.validators.validate_file_size]),
        ),
    ]
