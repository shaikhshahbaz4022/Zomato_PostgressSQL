from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
# Create your views here.

from .models import Order


def CreateOrder(request):
    if request.method == "POST":
        body = json.loads(request.body)
        foodname = body.get("foodname")
        name = body.get('name')
        status = body.get("status")
        ordercreate = Order.objects.create(
            foodname=foodname, name=name, status=status)
    else:
        return HttpResponse({"msg": "Wrong routes"})
    return HttpResponse(json.dumps({"data": "Posted succesfully"}))


def GetOrder(req):
    if req.method == "GET":
        allorders = Order.objects.all()
        allordersarr = {"data": list(allorders.values())}
        # latestData = serialize('json', allorders)
        return JsonResponse(allordersarr)


def Update(req, itemid):
    order = Order.objects.get(id=itemid)
    if req.method == "PATCH":
        body = json.loads(req.body)
        status = body['status']
        order.status = status
        order.save()
    else:
        return HttpResponse(json.dumps({"msg": "Wrong route"}))
    return HttpResponse(json.dumps({"msg": "Upated Successfully"}))


def Delete(req, itemid):
    order = Order.objects.get(id=itemid)
    if req.method == "DELETE":
        order.delete()
    else:
        return HttpResponse(json.dumps({"msg": "Wrong route"}))
    return HttpResponse(json.dumps({"msg": "Deleted Successfully"}))
