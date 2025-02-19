from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from django.contrib.auth.models import User
from fileapi.login.views import login 

PASSWORD = 'pass123'

class TestLoginView(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='user1', password=PASSWORD)

    def test_incorrect_login(self):
        response = self.client.post(reverse(login), {
            'username': 'user2',
            'password': PASSWORD
        })
        self.assertEqual(response.status_code, 401)

    def test_correct_login(self):
        response = self.client.post(reverse(login), {
            'username': 'user1',
            'password': PASSWORD
        })
        json_data = response.json()
        user = json_data['user']
        self.assertIsInstance(json_data['authToken'], str)
        self.assertEqual(user['id'], self.user.id)
        self.assertEqual(user['username'], self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_http_method(self):
        data = {
            'username': 'user1',
            'password': PASSWORD
        }

        test_cases = [
            ("post", 200),
            ("get", 405),
            ("put", 405),
            ("delete", 405),
            ("patch", 405),
        ]

        for method, expected_status in test_cases:
            with self.subTest(method=method, status=expected_status):
                response = getattr(self.client, method)(reverse(login), data)
                self.assertEqual(response.status_code, expected_status)
