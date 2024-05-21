import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedCourses } from 'src/app/Properties';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-completed-course',
  templateUrl: './completed-course.component.html',
  styleUrls: ['./completed-course.component.css'],
})
export class CompletedCourseComponent implements OnInit, OnDestroy {
  constructor(private service: StudentService, private router: Router) {}
  ngOnDestroy(): void {
    this.get().unsubscribe();
  }
  ngOnInit(): void {
    this.get();
  }
  completedCourse!: CompletedCourses;
  id = this.router.url.substring(11);

  get() {
    return this.service.getComplete(this.id).subscribe((next) => {
      this.completedCourse = next;
    });
  }
}
