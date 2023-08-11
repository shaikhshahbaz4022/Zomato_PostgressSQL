from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
# Create your views here.

from .models import Menu


def Create(request):
    if request.method == "POST":
        body = json.loads(request.body)

        foodname = body['foodname']
        price = body['price']
        available = body['available']
        menu = Menu.objects.create(
            foodname=foodname, price=price, available=available)
    else:
        return HttpResponse(json.dumps({"msg": "wrong routes"}))
    return HttpResponse(json.dumps({"msg": "Data Posted succesfully"}))


def Get(req):
    if req.method == "GET":
        items = Menu.objects.all()
        return JsonResponse(json.dumps({"msg": items}))
