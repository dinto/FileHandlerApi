import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from "rxjs";

@Component({
  selector: 'app-file-handler',
  templateUrl: './file-handler.component.html',
  styleUrl: './file-handler.component.css'

})
export class FileHandlerComponent {

  status: "initial" | "uploading" | "success" | "fail" = "initial"; 
  file: File | null = null; 
  name: String = "";


  FileArray : any[] = [];

  constructor(private http: HttpClient )
  {
    
    this.getAllFiles();
 
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    console.log('file',file)

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload(){
    if (this.file) {
      let formData = new FormData();
      formData.set('name',this.file.name);
      formData.set('file',this.file);
      this.http.post("http://127.0.0.1:8000/uploadFile",formData).subscribe((response)=>{
        this.status = 'success';
      });

    }
  }

  onUploads() {

    if (this.file) {
      console.log(this.file)
      const formData = new FormData();
      formData.set('name',this.file.name);
      formData.set('file',this.file)
  
  
      const upload = this.http.post("http://127.0.0.1:8000/uploadFile", formData);
  
      this.status = 'uploading';
      this.status = 'success';
  
      upload.subscribe({

        next: () => {

          this.status = 'success';
          this.getAllFiles();
        },
        error: (error: any) => {
          this.status = 'fail';
          return throwError(() => error);
        },
      });
    }
  }
  
  

  ngOnInit(): void { 
  } 

  getAllFiles()
  {
    this.http.get("http://127.0.0.1:8000/file").subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.FileArray = resultData;
    });
  }



  saveRecords()
  {
  
    let bodyData = {
      "file" : this.file,
      //"uploaded_at" : this.uploaded_at,
    };
 
    this.http.post("http://127.0.0.1:8000/file",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllFiles();
    });
  }


  setDelete(data: any)
  {



    if(confirm('Are you sure??')){
      this.http.delete("http://127.0.0.1:8000/file"+ "/"+ data.id).subscribe((resultData: any)=>
        {
            console.log(resultData);
            this.getAllFiles();
        });
      
    }
 
  }

  ViewFile(data: any)
  {
    var file_location=data.file
    var URL = "http://127.0.0.1:8000"+ file_location;  
    window.open(URL);
  }

}


  


