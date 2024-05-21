import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';
import { Course } from '../Properties';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit  {
  constructor(
    private router: Router,
    private service: CourseService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    var prev = this.router.lastSuccessfulNavigation?.finalUrl?.toString();
    this.router.navigateByUrl(prev!);
    this.getCourses();
  }
  id!: string;
  image: any;
  loaded!:boolean
  iserror!:boolean

  courses: Course[] = new Array();
  changeToImage(type: any, data: any) {
    let image = `data:${type};base64,${data}`
    return image;
  }

  getCourses() {
    return this.service.getAllCourses()
    .pipe(finalize(()=>this.loaded = true))
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
