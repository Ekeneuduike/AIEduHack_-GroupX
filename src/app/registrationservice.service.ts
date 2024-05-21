import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  delayWhen,
  map,
  never,
  of,
  retry,
  retryWhen,
  scan,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { Student } from './Properties';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class RegistrationserviceService {
  constructor(private http: HttpClient, private router: Router) {}
  student!: Student;
  response!: string;

  Path = "api/hackerX/home/"

  resetpassword(value: any) {
   return this.http.get(this.Path+'forgot',{responseType:'text',params:{'email':value}}).pipe();
  }

  register(registration: any) {
    return this.http
      .post('/api/hackerX/registration/register', registration, {
        responseType: 'text',
      })
      .pipe(
        map((data) => (this.response = data)),
        retry(5),
        catchError(this.handleError),
        retryWhen((error) =>
          error.pipe(
            scan((err, acc) => {
              if (!(err.status == 0)) throw err;
            }),
            delayWhen((value) => timer(value * 9900)),
            tap((err) => console.log(`error : ${err}`))
          )
        )
      );
  }

  login(logindata: FormData) {
    console.log('this is the formdata:', logindata);
    return this.http
      .post('/login', logindata, { responseType: 'text' })
      .pipe(catchError(this.handleLoginError));
    // .pipe(
    // map((data) => {
    //   localStorage.setItem('currentUser', JSON.stringify(data));
    // }),
    // tap( data => console.log(JSON.stringify(data))
    // ),
    // retry(5),
    // retryWhen((error) =>
    //   error.pipe(
    //     scan((acc, err) => {
    //       if (acc > 3) {
    //         throw error;
    //       }
    //       return acc + 1;
    //     }, 1),
    //     delayWhen((value) => timer(value * 1000)),
    //     tap((value) => console.log('retry', value))
    //   )
    // ),
    // catchError(this.handleError)
    // ) ;
  }

  logout() {
    this.http.get('/logout', { responseType: 'text' }).subscribe((next) => {
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/');
    });
  }

  finduserbyemail() {
    var id;
    this.http
      .get<Student>(
        'api/hackerX/home/Student'
        //  {params:{'email': value}}
      )
      .subscribe(
        (next) => {
          localStorage.setItem('currentUser', JSON.stringify(next));
          id = next.id;
          this.router.navigateByUrl(`home-dash/${id}`);
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            localStorage.removeItem('currentUser');
          } else {
            retry(3);
            localStorage.removeItem('currentUser');
          }
        }
      );
    return id;
  }
  checkUsersession() {
    var id;
    this.http
      .get<Student>(
        'api/hackerX/home/Student'
        //  {params:{'email': value}}
      )
      .subscribe(
        (next) => {
          localStorage.setItem('currentUser', JSON.stringify(next));
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            localStorage.removeItem('currentUser');
            console.log('use removed');
          } else {
            retry(3);
            localStorage.removeItem('currentUser');
            console.log('user removed');
          }
        }
      );
    return id;
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    // if(error.status != 200){
    //  window.alert("something went wrong try again later")
    // }
    var doc = document.getElementById('loading');
    if (doc) {
      doc.style.display = 'none';
    }
    var errorpanl = document.getElementById('error');
    var message = document.getElementById('errorMessage');
    if (error.status == 0) {
      retry(5);
      if (errorpanl && message) {
        errorpanl.style.display = 'block';
        message.innerHTML = ` error with status: ${error.status} network error please try again later`;
        errorpanl.addEventListener(
          'animationend',
          () => {
            if (errorpanl) {
              errorpanl.style.display = 'none';
            }
          },
          { once: true }
        );
        return throwError(() => 'something went wrong');
      }
    }

    let errorMessage = `an error occurred: ${error.message}`;
    console.log(error);
    console.log(error.statusText);

    let display = `server returned with status ${error.status} ${errorMessage}`;

    if (errorpanl && message) {
      errorpanl.style.display = 'block';
      message.innerHTML = display;
      errorpanl.addEventListener(
        'animationend',
        () => {
          if (errorpanl) {
            errorpanl.style.display = 'none';
          }
        },
        { once: true }
      );
    }
    return throwError(() => errorMessage);
  }

  appresponse() {
    return this.response;
  }
  handleLoginError(error: HttpErrorResponse): Observable<never> {
    var doc = document.getElementById('loading');
    if (doc) {
      doc.style.display = 'none';
    }
    var errorpanl = document.getElementById('error');
    var message = document.getElementById('errorMessage');
    if (error.status == 0) {
      retry(5);
    }
    if (errorpanl && message) {
      console.log(error.error);

      errorpanl.style.display = 'block';
      message.innerHTML = error.error;
    }

    return throwError(error);
  }
  errormessage!: string;
}
