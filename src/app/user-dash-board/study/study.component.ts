import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDto } from 'src/app/Properties';
import { StudyService } from 'src/app/service/study.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
})
export class StudyComponent implements OnDestroy, OnInit {
  constructor(private router: Router, private service: StudyService) {}
  ngOnDestroy(): void {
    this.getstudy().unsubscribe();
  }
  ngOnInit(): void {
    this.getstudy();
  }
  getCurrentCourse() {
   this.service.setCurrentCourse(this.course)
   console.log('here is the course you asked for',this.course);
   
  }

  id = this.router.getCurrentNavigation()?.extractedUrl.toString().substring(7);

  getid() {
    console.log(this.id);
  }
  course!: CourseDto;

  getstudy() {
    return this.service.getSubject(this.id!).subscribe((next) => {
      this.course = next;
      this.getCurrentCourse();
      localStorage.setItem('currentCourse',JSON.stringify(next))
      console.log(next);
    });
  }
}
