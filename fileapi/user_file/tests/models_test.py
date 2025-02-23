from django.test import TestCase
from django.contrib.auth.models import User
from fileapi.user_file.models import UserFile

class TestUserFile(TestCase):
    user: User
    path = "/some/folder/file.txt"

    def setUp(self):
        self.user = User(username="user1")
        self.user.save()
        file = UserFile(path=self.path, user=self.user)
        file.save()

    def test_revision_auto_increment(self):
        file = UserFile(path=self.path, user=self.user)
        file.save()
        # assert file with same path has second revision
        self.assertEqual(file.revision, 2)

        # assert file with different path has first revision
        file = UserFile(path="/some/folder/file2.txt", user=self.user)
        file.save()
        self.assertEqual(file.revision, 1)