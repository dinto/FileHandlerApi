from django.shortcuts import render,redirect,HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from FileHandlerApp.models import *
from FileHandlerApp.serializers import FileHandlerSerializer

from django.core.files.storage import default_storage
import os 


# Create your views here.
        

@csrf_exempt
def SaveFile(request,id=0):
    if request.method=='GET':
        filedetails = FileHandler.objects.all()
        file_serializer=FileHandlerSerializer(filedetails,many=True)
        return JsonResponse(file_serializer.data,safe=False)
    #elif request.method=='POST':
    #    file_data=JSONParser().parse(request)
    #    file_serializer=FileHandlerSerializer(data=file_data)
    #    if file_serializer.is_valid():
    #        file_serializer.save()
    #        return JsonResponse("Added Successfully",safe=False)   
    #    return JsonResponse("Failed to Add",safe=False)
    elif request.method=='DELETE':
        filedetails=FileHandler.objects.get(id=id)
        filedetails.delete()
        return JsonResponse("Deleted Successfully",safe=False)


@csrf_exempt

def uploadFile(request):
    if request.method =='POST':
        #files=request.FILES
        file_obj = request.FILES['file']        
        #file_serializer=FileHandlerSerializer(data=data)
        #print("file_serializer",file_serializer)
        #if file_serializer.is_valid():
        if file_obj:
            file_handler=FileHandler(file_name=file_obj,file=file_obj)
            file_handler.save()
            return JsonResponse("Added Successfully",safe=False)  
    