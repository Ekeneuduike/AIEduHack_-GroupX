import { ViewportScroller } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RegistrationserviceService } from '../registrationservice.service';
import { CourseService } from '../service/course.service';
import { CompletedCourses, CourseDto, StudentInfo } from '../Properties';
import { HttpEventType } from '@angular/common/http';
import { StudentService } from '../service/student.service';
import { finalize } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css'],
})
export class UserDashBoardComponent implements OnInit, OnDestroy {
  constructor(
    private scroller: ViewportScroller,
    private service: RegistrationserviceService,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.getCompletedCourses();
    this.getEnroolledCourses();
  }
  ngOnDestroy(): void {
    this.getEnroolledCourses().unsubscribe();
    this.getCompletedCourses().unsubscribe();
  }

  uploadProgress = 0;
  uploadImage() {
    document.getElementById('p-bar')?.classList.add('visible');
    let data = new FormData();
    data.append('file', this.profileImage!);
    return this.studentService
      .updateProfile(data, this.LoggednUser.id)
      .pipe(
        finalize(() => {
          this.profileImage = undefined;
          this.closeUpload();
          this.uploadProgress = 0;
        })
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total!)
            );
          }
          if (event.type === HttpEventType.Response) {
            window.alert('profile image updated successfully');
          }
        },
        (error) => {
          window.alert('something went wrong' + error.message);
        }
      );
  }
  closeUpload() {
    console.log('repeat');
    document.getElementById('p-bar')?.classList.remove('visible');
    let doc = document.getElementById('profileImage');
    if (doc) {
      doc.style.display = 'none';
    }
  }
  openchangeImageModal() {
    let doc = document.getElementById('profileImage');
    if (doc) {
      doc.style.display = 'block';
    }
  }
  closeChangePassword() {
    var doc = document.getElementById('c-passsword');
    if (doc) doc.style.display = 'none';
  }
  isAdmin(): boolean {
    let roleName: String[] = this.LoggednUser.roles.map((role) => {
      return role.name;
    });
    return roleName.includes('ADMIN');
  }

  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);
  submitPassword() {
    return this.studentService
      .changePassword(
        this.LoggednUser.id,
        this.password.value,
        this.confirmPassword.value
      )
      .subscribe(
        (next) => {
          window.alert('password successfully updated');
          this.closeChangePassword();
        },
        (error) => {
          window.alert('something went wrong try again later');
          this.closeChangePassword();
        }
      );
  }
  changePassword() {
    var doc = document.getElementById('c-passsword');
    if (doc) doc.style.display = 'block';
  }
  profileImage: File | undefined;
  getImage(event: Event) {
    let input = event.currentTarget as HTMLInputElement;
    let file = input.files![0];
    this.profileImage = file;
    console.log(file);
  }
  logout() {
    this.service.logout();
  }
  navtoPro() {
    console.log('hello to profile');

    this.scroller.scrollToAnchor('profile');
  }
  navtoEnroll() {
    this.scroller.scrollToAnchor('enroll');
  }
  navtoCom() {
    this.scroller.scrollToAnchor('completed');
  }

  LoggednUser: StudentInfo = JSON.parse(localStorage.getItem('currentUser')!);

  completedCourses!: CompletedCourses[];
  com_loaded!:boolean;
  com_error!:boolean;
  enrolledCourse!: CourseDto[];
  en_loaded!:boolean;
  en_error!:boolean;

  transformimage(data: any, type: string) {
    return `data:${type};base64,${data}`;
  }
  user = JSON.parse(localStorage.getItem('currentUser')!);
  getEnroolledCourses() {
    return this.courseService
      .getenrolledCourses(this.user.id)
      .pipe(finalize(()=>{this.en_loaded = true}))
      .subscribe((next) => {
        this.enrolledCourse = next.map((next) => {
          let course: CourseDto = {
            id: next.id,
            name: next.name,
            description: next.description,
            thumbnail: this.transformimage(next.thumbnail, next.filetype),
            filetype: next.filetype,
            subjects: next.subjects,
            score: next.score,
          };
          return course;
        });
        
        console.log('hello received data for enrolled courses');
      },(error)=>{this.en_error = true});
  }

  getCompletedCourses() {
    return this.courseService
      .getCompletedCourses(this.user.id)
      .pipe(finalize(()=>{this.com_loaded = true}))
      .subscribe((next) => {
        this.completedCourses = next.map((next) => {
          let course: CompletedCourses = {
            id: next.id,
            student: next.student,
            course: {
              id: next.course.id,
              name: next.course.name,
              description: next.course.description,
              thumbnail: this.transformimage(
                next.course.thumbnail,
                next.course.filetype
              ),
              filetype: next.course.filetype,
              subjects: next.course.subjects,
              score: next.course.score,
            },
            completionDate: next.completionDate,
          };
          return course;
        });
       
        
      },(error)=>{this.com_error=true});
  }
}
