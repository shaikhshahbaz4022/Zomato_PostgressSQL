
from django.urls import path
from . import views

urlpatterns = [
    path("create", views.Create, name="Create"),
    path("get", views.Get, name="get"),
    path("update/<int:item_id>", views.Update, name="update"),
    path("delete/<int:item_id>", views.Delete, name="delete")

]
