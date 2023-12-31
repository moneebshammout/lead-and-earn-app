# Generated by Django 4.2.4 on 2023-08-02 21:17

import custom_user.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0003_tokenproxy'),
        ('custom_user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExpirationToken',
            fields=[
                ('token_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authtoken.token')),
            ],
            bases=('authtoken.token',),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.ImageField(upload_to='images/', validators=[custom_user.validators.validate_file_size]),
        ),
    ]
