import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../Properties';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client:HttpClient) { }
 
  Path:string = 'api/hackerX/admin';

  addCourse(course:any,image:File){
   let  form = new FormData();
   form.append('file',image)
   form.append('course',JSON.stringify(course))
    return this.client.post(this.Path+'/add',form,{reportProgress:true,observe:'events',responseType:'text'});
  }
  getCourse(){
    this.client.get("")
  }
  updateCourse(){
    this.client.patch("","")
  }
  deleteCourse(){
    this.client.delete("")
  }
}
