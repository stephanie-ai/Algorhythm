# Generated by Django 3.1.5 on 2021-02-03 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SpotifyToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('refresh_token', models.CharField(max_length=150)),
                ('access_token', models.CharField(max_length=150)),
                ('expires_in', models.DateTimeField()),
                ('token_type', models.CharField(max_length=50)),
            ],
        ),
    ]
