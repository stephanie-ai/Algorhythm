# Generated by Django 3.1.5 on 2021-02-03 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210131_1623'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='current_song',
            field=models.CharField(max_length=50, null=True),
        ),
    ]