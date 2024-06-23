from django.db import models

# Create your models here.

class FileHandler(models.Model):
    file_name= models.CharField(max_length=250, null=True , blank= True)
    file = models.FileField(blank=False, null=False)
    #file = models.FileField(upload_to='media/',blank=False, null=False)
    uploaded_at = models.DateTimeField(null=True,blank=True)
    
    def __str__(self):
        return self.file.name