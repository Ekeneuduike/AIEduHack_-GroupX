import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompletedCourses } from '../Properties';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  changePassword(id: string, password:any, confirmPassword:any) {
    let data = new FormData()
    data.append('id',id);
    data.append('password',password);
    data.append('confirmPassword',confirmPassword)
    return this.client.patch(this.Path+'change_password',data,{responseType:'text'}).pipe()
  }
  updateProfile(data: FormData,id:any) {
   return this.client.patch(this.Path+'update_profile',data,{params:{'id':id},reportProgress:true,observe:'events',responseType:'text'}).pipe(

   )
  }
  

  constructor(private client:HttpClient) { }

  Path = "api/hackerX/student/"

  getComplete(id: any) {
   return this.client.get<CompletedCourses>(this.Path+"completed",{params:{'courseId':id}}).pipe()
  }

  login(){
   this.client.post("","")
  }
  hasvalidsession(){
   this.client.get("")
  }
  getStudentinfo(){
   this.client.get("")
  }
 addProfilePhoto(){
  this.client.post("","")
 }

}
