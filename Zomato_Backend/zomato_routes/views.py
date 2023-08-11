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
        data = {"items": list(items.values())}
        return JsonResponse(data)


def Update(req, item_id):
    if req.method == "PATCH":
        try:
            menu_item = Menu.objects.get(pk=item_id)
            menu_item.available = "yes"
            menu_item.save()
            return HttpResponse(json.dumps({"msg": "availablity Updated Succesfully "}))
        except Menu.DoesNotExist:
            return HttpResponse(json.dumps({"msg": "Item Not Found"}))
    else:
        return HttpResponse(json.dumps({"msg": "wrong Request"}))


def Delete(req, item_id):
    if req.method == "DELETE":
        try:
            menu_item = Menu.objects.get(id=item_id)
            menu_item.delete()
            return HttpResponse(json.dumps({"msg": "item Deleted Succesfully "}))
        except Menu.DoesNotExist:
            return HttpResponse(json.dumps({"msg": "Item Not Found"}))
    else:
        return HttpResponse(json.dumps({"msg": "wrong Request"}))
