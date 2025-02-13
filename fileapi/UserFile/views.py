from django.http import HttpRequest, HttpResponse, FileResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserFile

def getFiles(request: HttpRequest, url: str):
    files = UserFile.objects.filter(user=request.user).order_by("file")
    return [user_file.path for user_file in files]

def uploadFile(request: HttpRequest, url: str):
    for _, file in request.FILES.items():
        userFile = UserFile(user=request.user, path=url, file=file)
        userFile.save()

def deleteAllFiles():
    user_files = UserFile.objects.all()

    for user_file in user_files:
        user_file.file.delete()

    user_files.delete()

@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def files(request: HttpRequest, url: str):
    if request.method == "POST":
        uploadFile(request, url)
        return HttpResponse("Uploaded")
    elif request.method == "GET":
        files = getFiles(request, url)
        return HttpResponse(files)
    elif request.method == "DELETE":
        deleteAllFiles()
        return HttpResponse("Files deleted")
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def download(request: HttpRequest, url: str):
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
