from __future__ import unicode_literals

from django.db import models


class User(models.Model):
    ssn = models.CharField(max_length=9, primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)

    def __str__(self):
        return self.firstName + " " + self.lastName + " " + self.ssn


class Therapy(models.Model):
    ssn = models.ForeignKey(User, on_delete = models.CASCADE)
    therapyName = models.CharField(max_length=100)
    therapistName = models.CharField(max_length=100)
    volunteerName = models.CharField(max_length=100,null=True)
    date = models.CharField(max_length=100)
    startTime = models.CharField(max_length=50)
    endTime = models.CharField(max_length=50)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.therapyName+ " " + self.ssn.firstName + " " +self.ssn.lastName +  " " + self.location +" "+ self.date





