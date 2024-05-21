import { ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from './service/student.service';
import { RegistrationserviceService } from './registrationservice.service';
import { Student, StudentInfo } from './Properties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  toogleNavbar1() {
    document.getElementById('nav-tog1')?.classList.toggle('nav-tog1');
  }

  toogleNavbar() {
    document.getElementById('nav-tog')?.classList.toggle('nav-tog1');
  }
  constructor(
    private router: Router,
    private scroller: ViewportScroller,
    private studentservice: StudentService
  ) {}
  service = inject(RegistrationserviceService);

  student!: Student;

  ngOnInit(): void {
    this.service.checkUsersession();
  }

  id!: string;

  isloggedinUser() {
    return localStorage.getItem('currentUser') != null;
  }

  routetologin() {
    this.router.navigateByUrl('login');
  }
  title = 'ai_hacker_X';
  scroolltoCourse() {
    this.scroller.scrollToAnchor('navbar');
  }
}
