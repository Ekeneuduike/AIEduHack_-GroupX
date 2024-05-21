import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationserviceService } from '../registrationservice.service';
import {
  EMPTY,
  Observable,
  catchError,
  delayWhen,
  map,
  retry,
  retryWhen,
  scan,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  response!: string;

  isformValid() {
    console.log('this form is vaild:', this.registrationObject.valid);
    return !this.registrationObject.valid;
  }

  constructor(
    private router: Router,
    private service: RegistrationserviceService
  ) {}
  errormessage: string = '';
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.isformValid();
  }

  registrationObject = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
  });
  loginData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  //  logindata:LoginData = {
  //   username:this.loginData.value.username,
  //   password:this.loginData.value.username
  //  }
  getpath() {
    var url = this.router.url;
    var isregister = url.match('auth/register');
    //  console.log(url);
    //  console.log(isregister);

    return isregister;
  }

  register() {
    var doc = document.getElementById("loading")
    if(doc){
      doc.style.display= 'block'
    }
    var object = this.registrationObject.value;
    this.service.register(this.registrationObject.value).subscribe((next) => {
      this.registrationObject.reset()
      console.log(next);
      this.router.navigateByUrl( '/auth/register/checkout');
    });
  }

  login() {
    let data = new FormData();
    console.log(this.loginData.value);
    data.append('username', this.loginData.controls.username.value!)
    data.append('password',this.loginData.controls.password.value!)
    console.log('this is the data',data)
    var doc = document.getElementById("loading")
    if(doc){
      doc.style.display= 'block'
    }
    this.service.login(data).subscribe(
     (next)=> {
      console.log('this is the value',next)
      
      if(doc){doc.style.display='none'}
      this.service.finduserbyemail();
      }
    );
  }

  formdata!: FormData;
}
