"""
URL configuration for fileapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path

from fileapi.login import views as LoginViews
from fileapi.user_file import views as UserFileViews

urlpatterns = [
    path('login/', LoginViews.login),

    # Get all files for logged in user
    path('get-files', UserFileViews.get_files),

    # Used for debugging
    path('delete-all-files/', UserFileViews.delete_all_files),

    # Upload or download a file
    re_path(r'^(?P<url>.*)/$', UserFileViews.file),
]
