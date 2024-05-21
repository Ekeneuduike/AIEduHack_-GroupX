import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course, CourseDto } from 'src/app/Properties';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css']
})
export class CoursepageComponent implements OnInit,OnDestroy{
  constructor(private router:Router,private service:CourseService){}
  ngOnInit(): void {
    this.getCurrentCourse()
   
  }
  ngOnDestroy(): void {
    this.getCurrentCourse().unsubscribe()
    this.enroll().unsubscribe()
  }

  course!:CourseDto;

  response = new FormControl(0,[Validators.required])
  id = this.router.url.substring(8)
  user = JSON.parse(localStorage.getItem('currentUser')!);
   getCurrentCourse(){
    return this.service.getCourse(this.id).subscribe((next)=> {this.course = next})
    
  }


enroll() {
 return  this.service.enrollCourse(this.response.value!,this.id,this.user.id).subscribe(
    (next)=>{
      document.getElementById('success')?.classList.add('open')
      console.log(next)}
  );
}

}
