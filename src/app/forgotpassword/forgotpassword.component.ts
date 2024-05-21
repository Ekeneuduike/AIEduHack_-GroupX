import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegistrationserviceService } from '../registrationservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit ,OnDestroy{

 constructor(private service:RegistrationserviceService){

 }
  ngOnDestroy(): void {
    this.requestPasswordChange().unsubscribe()
  }
  ngOnInit(): void {
  
  }
  

  email= new FormControl();

  requestPasswordChange(){
    let doc = document.getElementById('p-bar');
    if(doc){doc.style.display='block'}
    return this.service.resetpassword(this.email.value).
    subscribe(
      (next)=>{window.alert('email sent please check your email for password reset link');if(doc){doc.style.display='none'}},
      (error)=>{window.alert('sorry somthing went wrong please ensure you enter a valid email');if(doc){doc.style.display='none'}}
    )
  }
}
