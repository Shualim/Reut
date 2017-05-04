from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    ssn = models.CharField(max_length=9, primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)

    def __str__(self):
        


class Therapy(models.Model):
    therapyName = models.CharField(max_length=100)
    ssn = models.ForeignKey(User)
    therapistName = models.CharField(max_length=100)
    volunteerName = models.CharField(max_length=100)
    date = models.DateField()
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    location = models.CharField(max_length=100)






