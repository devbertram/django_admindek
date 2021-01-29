# Generated by Django 3.1.5 on 2021-01-25 05:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authentication', '0004_auto_20210120_1302'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersubroute',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='userSubroute_user', to='auth.user'),
            preserve_default=False,
        ),
    ]