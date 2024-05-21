import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course, CourseDto, Student } from '../Properties';
import { CourseService } from '../service/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy, OnInit {
  constructor(private service: CourseService) {}
  ngOnInit(): void {
    this.getCourses();
  }
  ngOnDestroy(): void {
    this.getCourses().unsubscribe();
  }

  courses: Course[] = new Array();
  iserror!:boolean
  loaded!:boolean

  getCourses() {
    return this.service.getAllCourses().pipe(finalize(()=>{this.loaded = true}))
    .subscribe(
      (next) => {
       this.courses = next.map((next) => {
          let courses: Course = {
            id: next.id,
            name: next.name,
            thumbnail: "data:"+next.filetype+';base64,'+next.thumbnail,
            description: next.description,
            subjects: next.subjects,
            score: next.score,
          };
          return courses;
        });

      },
      (error) => {
        this.iserror = true;
        console.log(
          "couldn't fetch data from server",
          error.error,
          error.message
        );
      }
    );
  }
}
