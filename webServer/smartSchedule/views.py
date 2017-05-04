from models import User, Therapy
from django.http import HttpResponse
import json


def get_user(request,user_id):
    user = User.objects.get(ssn=user_id)
    s = user + ""
    return HttpResponse(json.dumps(s), content_type="application/json")


def add_user_schedule(request):
    body = json.loads(request.body)
    response = {}
    if not request.method == "POST":
        response["answer"] = "NOK"
        return HttpResponse(response, content_type="application/json")
    user_id= body['userId']
    user_name= body['name']
    first_name,last_name = user_name.split('\s+')
    user = User(ssn=user_id, firstName=first_name, lastName=last_name)
    index = 0
    for therapy in body['schedule']:
        th = therapy[index]
        new_therapy = Therapy(therapistName=th['therapistName'], date=th['date'],startTime=th['start'],endTime =th['end'],\
                              location=th['location'],ssn = user.ssn, therapyName = th['name'])
        new_therapy.save()
        index = index+1
    if not User.objects.get(pk=user.ssn).exists():
        user.save()
    return HttpResponse()
