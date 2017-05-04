from models import User
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
    user_id= body['name']