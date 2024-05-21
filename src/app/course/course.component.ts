import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Course } from '../Properties';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy{

  constructor(private service:CourseService){}
  ngOnInit(): void {
    this.getCourses();
  }
  ngOnDestroy(): void {
   this.getCourses().unsubscribe()
  }
  searchInfo = new FormControl();
   load:boolean = false;

  courses: Course[] = new Array();
  changeToImage(type: any, data: any) {
    let image = `data:${type};base64,${data}`
    return image;
  }

  search() { 
  this.load = true;
    this.service.search(this.searchInfo.value)
    .pipe( finalize(()=>{this.load = false}))
    .subscribe(
      (next) => {
        this.courses = next.map((next) => {
          let courses: Course = {
            id: next.id,
            name: next.name,
            thumbnail: this.changeToImage(next.filetype, next.thumbnail),
            description: next.description,
            subjects: next.subjects,
            score: next.score,
          };
          return courses;
        });

      },
    )
     }
  
  getCourses() {
    this.load = true;
    return this.service.getAllCourses()
    .pipe(finalize(()=>{this.load = false}))
    .subscribe(
      (next) => {
        this.courses = next.map((next) => {
          let courses: Course = {
            id: next.id,
            name: next.name,
            thumbnail: this.changeToImage(next.filetype, next.thumbnail),
            description: next.description,
            subjects: next.subjects,
            score: next.score,
          };
          return courses;
        });
      },
      (error) => {
        console.log(
          "couldn't fetch data from server",
          error.error,
          error.message
        );
      }
    );
  }

}
