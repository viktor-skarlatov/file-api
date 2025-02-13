from django.http import HttpRequest, HttpResponse, FileResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserFile

def get(request: HttpRequest):
    files = UserFile.objects.filter(user=request.user).order_by("file")
    return [user_file.path for user_file in files]

def upload(request: HttpRequest, url: str):
    for _, file in request.FILES.items():
        userFile = UserFile(user=request.user, path=url, file=file)
        userFile.save()

def deleteAll():
    user_files = UserFile.objects.all()

    for user_file in user_files:
        user_file.file.delete()

    user_files.delete()

def downloadFile(request: HttpRequest, url: str):
    try:
        revision = int(request.GET.get('revision'))
    except:
        revision = 1

    userFile = UserFile.objects.filter(user=request.user, path=url, revision=revision).first()

    if userFile:
        [_, fileName] = userFile.file.path.rsplit('/', 1)
        response = FileResponse(open(userFile.file.path, 'rb'), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{fileName}"'
        return response
    else:
        return HttpResponse(status=404)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteAllFiles(request: HttpRequest):
    deleteAll()
    return HttpResponse("OK")

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def file(request: HttpRequest, url: str):
    if (request.method == 'GET'):
        return downloadFile(request, url)

    upload(request, url)
    return HttpResponse("Uploaded")
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getFiles(request: HttpRequest):
    files = get(request)
    return HttpResponse(files)
