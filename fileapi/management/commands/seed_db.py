from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Seeds the database with one test user'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='testuser').exists():
            user = User.objects.create_user(
                username='skarlatov',
                password='pass123',
                email='viktor.skarlatov@gmail.com'
            )
            self.stdout.write(self.style.SUCCESS(f"Test user '{user.username}' created successfully!"))
        else:
            self.stdout.write(self.style.SUCCESS("Test user already exists!"))
