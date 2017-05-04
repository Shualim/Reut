from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    ssn = models.CharField(max_length=9)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)


class Therapies(models.Model):
    therapistName = models.CharField(max_length=100)
    volunteerName = models.CharField(max_length=100)
    date = models.DateField()
    startTime = models.DateTimeField()
    location = models.CharField(max_length=100)






