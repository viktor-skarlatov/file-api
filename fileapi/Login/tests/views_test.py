from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from fileapi.login.views import login 
from rest_framework.test import APIClient
password = 'pass123'

class TestLoginView(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='user1', password=password)

    def test_wrong_login(self):
        response = self.client.post(reverse(login), {
            'username': 'user2',
            'password': password
        })
        self.assertEqual(response.status_code, 401)

    def test_correct_login(self):
        response = self.client.post(reverse(login), {
            'username': 'user1',
            'password': password
        })
        json_data = response.json()
        user = json_data['user']
        self.assertIsInstance(json_data['authToken'], str)
        self.assertEqual(user['id'], self.user.id)
        self.assertEqual(user['username'], self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_method(self):
        data = {
            'username': 'user1',
            'password': password
        }

        response = self.client.get(reverse(login), data)
        self.assertEqual(response.status_code, 405)

        response = self.client.patch(reverse(login), data)
        self.assertEqual(response.status_code, 405)

        response = self.client.put(reverse(login), data)
        self.assertEqual(response.status_code, 405)

        response = self.client.delete(reverse(login), data)
        self.assertEqual(response.status_code, 405)
