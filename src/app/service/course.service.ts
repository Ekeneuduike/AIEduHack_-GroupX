import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { CompletedCourses, Course, CourseDto } from '../Properties';
import {
  Observable,
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  scan,
  tap,
  throwError,
  timer,
} from 'rxjs';
import {  Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class CourseService {
 
 
  constructor(private client: HttpClient) {}
 
  
  Path:string = "api/hackerX/course";
  Student_Path = "api/hackerX/student";
  Search_Path = 'api/hackerX/home';
  
 
  search(value: any) {
   return this.client.get<CourseDto[]>(this.Search_Path+'/search',{params:{'search':value}}).pipe()
  }
  
  getCourse(courseId:any){
   return this.client.get<CourseDto>(this.Path+"/course/"+courseId).pipe(
    
    )
  }
 
  enrollCourse(response:number,courseId:any,id:any) {
    let num = response as number
    console.log(num,'can you believe this',response);
    
     return  this.client.get(this.Path+"/enroll",{params:{'id':id,'courseId':courseId,'response':response}, 
    responseType:'text'})
     .pipe()
    }

 
  getAllCourses() {
   return this.client.get<CourseDto[]>('api/hackerX/home/all').pipe(
      retryWhen((error) =>
        error.pipe(
          scan((err, acc) => {
            if ( acc < 3) {
              return err;
            }
            return acc++;
          },1),
          delayWhen((value) => timer(value * 4000))
        )
      ),
      tap((value) => console.log('tapped value ', value)),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  // student courses start here 

  getenrolledCourses(id:any) {
  return this.client.get<CourseDto[]>(this.Student_Path+"/enrolled_courses",{params:{'id':id}}).pipe(

  )
  }

  getCompletedCourses(id:any) {
    return this.client.get<CompletedCourses[]>(this.Student_Path +"/completed_course",{params:{'id':id}}).pipe(

    )
  }
 
 
  getSubject() {}
}


