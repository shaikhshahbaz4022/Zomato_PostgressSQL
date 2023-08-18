from django.test import TestCase, Client
from .models import Order


class OrderTesting(TestCase):
    def setUp(self) -> None:
        self.client = Client()

    def test_bookOrder_route(self):
        url = '/order/create'
        data = {"foodname": "chicken Tandoori",
                "name": "jhon", "status": "pending"}

        response = self.client.post(url, data, content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEquals(Order.objects.count(), 1)

    def test_get_orders(self):
        url = '/order/get'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()

        self.assertTrue(isinstance(data, dict))
        self.assertTrue('data' in data)
        self.assertTrue(isinstance(data['data'], list))

        self.assertEqual(len(data['data']), Order.objects.count())
