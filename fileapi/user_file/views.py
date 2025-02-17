from django.http import HttpRequest, FileResponse, JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserFile

def get_file_list(request: HttpRequest):
    files = UserFile.objects.filter(user=request.user).order_by("file")
    return list(set([user_file.path for user_file in files]))

def upload(request: HttpRequest, url: str):
    for _, file in request.FILES.items():
        userFile = UserFile(user=request.user, path=url, file=file)
        userFile.save()

def delete_all():
    user_files = UserFile.objects.all()

    for user_file in user_files:
        user_file.file.delete()

    user_files.delete()

def download_file(request: HttpRequest, url: str):
    try:
        revision = int(request.GET.get('revision'))
    except:
        revision = 1

    userFile = UserFile.objects.filter(user=request.user, path=url, revision=revision).first()

    if userFile:
        response = FileResponse(open(userFile.file.path, 'rb'), as_attachment=True)
        return response
    else:
        return JsonResponse({ 'message': 'Not found' }, status=404)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def file(request: HttpRequest, url: str):
    if (request.method == 'GET'):
        return download_file(request, url)

    upload(request, url)
    return JsonResponse({ 'message': 'OK' })
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_files(request: HttpRequest):
    files = get_file_list(request)
    return JsonResponse({
        'files': files
    })

@api_view(['DELETE'])
def delete_all_files(request: HttpRequest):
    delete_all()
    return JsonResponse({ 'message': 'OK' })
