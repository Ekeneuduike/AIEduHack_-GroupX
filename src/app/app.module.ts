import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { CourseComponent } from './course/course.component';
import { CompletedCourseComponent } from './user-dash-board/completed-course/completed-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserHomeComponent } from './user-home/user-home.component';
import { CheckoutComponent } from './login/checkout/checkout.component';
import { ExamComponent } from './exam/exam.component';
import { StudyContentComponent } from './study-content/study-content.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CoursepageComponent } from './course/coursepage/coursepage.component';
import { StudyComponent } from './user-dash-board/study/study.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import {MatExpansionModule, matExpansionAnimations} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgOptimizedImage } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashBoardComponent,
    HomeComponent,
    CourseComponent,
    CompletedCourseComponent,
    UserHomeComponent,
    CheckoutComponent,
    ExamComponent,
    StudyContentComponent,
    CoursepageComponent,
    StudyComponent,
    ErrorComponent,
    AdminComponent,
    ForgotpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
