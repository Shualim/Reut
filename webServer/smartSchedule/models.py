from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    ssn = models.CharField(9)
    firstName = models.CharField(50)
    lastName = models.CharField(50)


class Therapies(models.Model):
    userId =
    therapistName = models.CharField(100)
    volunteerName = models.CharField(100)
    date = models.DateField(input_formats=settings.DATE_INPUT_FORMATS)
    startTime = models.DateTimeField(input_formats=settings.DATE_TIME_INPUT_FORMATS)
    location = models.CharField(100)






