from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

seedPassword = 'pass123'

class Command(BaseCommand):
    help = 'Seeds the database with one test user'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='user1').exists():
            User.objects.create_user(
                username='user1',
                password=seedPassword
            )

        if not User.objects.filter(username='user2').exists():
            User.objects.create_user(
                username='user2',
                password=seedPassword
            )
        
