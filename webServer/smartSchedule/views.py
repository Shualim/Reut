# -*- coding: utf-8 -*-
from models import User, Therapy
from django.http import HttpResponse
import json
from requests import post


def get_user(request,user_id):
    answ = {}
    try:
        user = User.objects.get(ssn=user_id)
    except User.DoesNotExist:
        answ['status'] = 'FAIL'
        return HttpResponse(json.dumps(answ))
    answ['userId'] = user.ssn
    answ['name'] = user.firstName + " " + user.lastName
    answ['schedule'] = []
    therapies = Therapy.objects.filter(ssn_id = user.ssn)
    for therapy in therapies:
        th = dict()
        th['name'] = therapy.therapyName
        th['date'] = therapy.date
        th['start'] = therapy.startTime
        th['end'] = therapy.endTime
        th['location'] = therapy.location
        th['therapistName'] = therapy.therapistName
        if therapy.volunteerName is not None:
            th['volunteerName'] = therapy.volunteerName
        answ['schedule'].append(th)
    answ['status'] = 'OK'
    print json.dumps(answ)
    return HttpResponse(json.dumps(answ), content_type="application/json")


def add_user_schedule(request):
    body = json.loads(request.body)
    response = {}
    filters = ["אשפוז","אשפוז יום","א יום"]
    if not request.method == "POST":
        response["status"] = "FAIL"
        return HttpResponse(response, content_type="application/json")
    user_id = body['userId']
    user_name = body['name']
    first_name,last_name = user_name.split()
    user = User(ssn=user_id, firstName=first_name, lastName=last_name)
    for th in body['schedule']:
        for fltr in filters:
            th['name'] = th['name'].replace(fltr, "")
        new_therapy = Therapy(therapistName=th['therapistName'], date=th['date'],startTime=th['start'],\
                                  endTime=th['end'],location=th['location'], therapyName = th['name'])
        new_therapy.ssn_id = user.ssn
        new_therapy.save()
    user.save()
    response["status"] = "OK"
    return HttpResponse(json.dumps(response))


def run_demo_script(request):
    f = open('real.json', 'r+')
    a = json.load(f)
    post('http://localhost:8000/upload/', json=a)
    return HttpResponse()