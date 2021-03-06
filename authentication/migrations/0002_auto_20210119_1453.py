# Generated by Django 3.1.5 on 2021-01-19 06:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='route',
            name='created_by',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.PROTECT, related_name='created_by_user', to='auth.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='route',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='route',
            name='updated_by',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.PROTECT, related_name='updated_by_user', to='auth.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='subroute',
            name='route',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subroute_route', to='authentication.route'),
        ),
        migrations.CreateModel(
            name='UserSubroute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subroute', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='userSubroute_subroute', to='authentication.subroute')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userSubroute_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRoute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='userRoute_route', to='authentication.route')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userRoute_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
