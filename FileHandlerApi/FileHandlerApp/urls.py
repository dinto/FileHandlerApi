
from FileHandlerApp import views
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns=[
    path('file',views.SaveFile,name='file'),
    path('file/<id>',views.SaveFile),
    path('uploadFile',views.uploadFile)
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)