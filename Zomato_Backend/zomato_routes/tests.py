from django.test import TestCase, Client
from django.urls import reverse
from .models import FoodMenu
import json
from .views import Get

# Create your tests here.


class Menutests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_create_food(self):
        url = '/crud/create'
        data = {'foodname': 'pasta', 'price': 12, 'available': "yes"}

        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(FoodMenu.objects.count(), 1)

    def test_get_route(self):
        url = '/crud/get'

        response = self.client.get(url)
        print(response)

        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode('utf-8'))
        print(response_data)
        data_expected = '[]'
        self.assertEqual(response_data, data_expected)

    def test_update_route(self):
        self.menu_items = FoodMenu.objects.create(
            foodname="Burger", price=20, available="no")
        change_availablity = {"available": "yes"}
        url = f"/crud/update/{self.menu_items.id}"
        response = self.client.patch(
            url, change_availablity, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        updatedMenu = FoodMenu.objects.get(id=self.menu_items.id)
        self.assertEqual(updatedMenu.available, "yes")

    def test_delete_route(self):
        self.newdata = FoodMenu.objects.create(
            foodname="Burger", price=20, available="no")

        url = f'/crud/delete/{self.newdata.id}'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)

        # verifying deleted or not

        with self.assertRaises(FoodMenu.DoesNotExist):
            deletedMenu = FoodMenu.objects.get(id=self.newdata.id)
