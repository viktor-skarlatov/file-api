from django.http import HttpRequest, JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.authentication import authenticate

@api_view(['POST'])
def login(request: HttpRequest):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        result = Token.objects.get_or_create(user=user)
        return JsonResponse({
            "authToken": result[0].key,
            "user": {
                "id": user.id,
                "username": user.username,
            }
        })  
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

