from __future__ import unicode_literals

from django.db import models
from webServer import settings


class User(models.Model):
    ssn = models.CharField(max_length=9)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)


class Therapies(models.Model):
    therapistName = models.CharField(max_length=100)
    volunteerName = models.CharField(max_length=100)
    date = models.DateField(input_formats=settings.DATE_INPUT_FORMATS)
    startTime = models.DateTimeField(input_formats=settings.DATE_TIME_INPUT_FORMATS)
    location = models.CharField(max_length=100)






