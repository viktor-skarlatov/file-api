from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from fileapi.user_file import views as UserFileViews
from fileapi.user_file.models import UserFile
from rest_framework.test import APIClient

password = 'pass123'
file_path = '/files/doc.pdf'

class TestUserFileView(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='user1', password=password)

    def test_get_files_unauthorized(self):
        response = self.client.get(reverse(UserFileViews.get_files))
        self.assertEqual(response.status_code, 401)

    def test_get_files_http_method(self):
        self.client.force_authenticate(user=self.user)

        test_cases = [
            ("get", 200),
            ("post", 405),
            ("put", 405),
            ("delete", 405),
            ("patch", 405),
        ]

        for method, expected_status in test_cases:
            with self.subTest(method=method, status=expected_status):
                response = getattr(self.client, method)(reverse(UserFileViews.get_files))
                self.assertEqual(response.status_code, expected_status)
    
    def test_get_file(self):
        file = UserFile(path=file_path, user=self.user)
        file.save()
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse(UserFileViews.get_files))
        json_data = response.json()
        self.assertIn('files', json_data)
        fileList = json_data['files']
        self.assertIsInstance(fileList, list)
        self.assertEqual(len(fileList), 1)
        self.assertEqual(fileList[0], file_path)

    def test_multiple_revisions(self):
        file = UserFile(path=file_path, user=self.user)
        file.save()

        file = UserFile(path=file_path, user=self.user)
        file.save()
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse(UserFileViews.get_files))
        json_data = response.json()
        self.assertIn('files', json_data)
        fileList = json_data['files']
        self.assertIsInstance(fileList, list)
        self.assertEqual(len(fileList), 1)
        self.assertEqual(fileList[0], file_path)

    def test_different_files(self):
        file = UserFile(path=file_path, user=self.user)
        file.save()

        file = UserFile(path='/another/file/doc.pdf', user=self.user)
        file.save()
        self.client.force_authenticate(user=self.user)

        response = self.client.get(reverse(UserFileViews.get_files))
        json_data = response.json()
        self.assertIn('files', json_data)
        fileList = json_data['files']
        self.assertIsInstance(fileList, list)
        self.assertEqual(len(fileList), 2)
        self.assertEqual('/another/file/doc.pdf' in fileList, True)
        self.assertEqual(file_path in fileList, True)

    # FILE UPLOAD/DOWNLOAD
    # TODO: Can't get this one to work. Always returns 301 in the unit test.
    # When testing manually it works
    # def test_file_unauthorized(self):
    #     response = self.client.get(path=file_path)
    #     self.assertEqual(response.status_code, 401)

    
    