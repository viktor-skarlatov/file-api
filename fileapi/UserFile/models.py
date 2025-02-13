from django.db import models
from django.contrib.auth.models import User

def user_dir_path(instance, _):
    [path, fileName] = instance.path.rsplit('/', 1)
    return f"{instance.user.id}/{path}/{instance.revision}/{fileName}"

class UserFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to=user_dir_path)
    path = models.TextField(null=False)
    revision = models.IntegerField(default=1, editable=False)

    def save(self, *args, **kwargs):
        if not self.pk:
           last_file = UserFile.objects.filter(user=self.user, path=self.path).order_by("-revision").first()
           if last_file:
               self.revision = last_file.revision + 1
        super().save(*args, **kwargs)
