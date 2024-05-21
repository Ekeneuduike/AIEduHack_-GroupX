import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { CourseComponent } from './course/course.component';
import { CheckoutComponent } from './login/checkout/checkout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CoursepageComponent } from './course/coursepage/coursepage.component';
import { StudyComponent } from './user-dash-board/study/study.component';
import { StudyContentComponent } from './study-content/study-content.component';
import { CompletedCourseComponent } from './user-dash-board/completed-course/completed-course.component';
import { ExamComponent } from './exam/exam.component';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './auth.guard';
import { noauthGuard } from './noauth.guard';
import { AdminComponent } from './admin/admin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  { path: 'auth/:id', component: LoginComponent, canActivate: [noauthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [noauthGuard] },
  {
    path: 'user-dashboard',
    component: UserDashBoardComponent,
    canActivate: [authGuard],
  },
  { path: 'course', component: CourseComponent },
  { path: 'auth/register/checkout', component: CheckoutComponent },
  { path: 'forgot', component: ForgotpasswordComponent },
  {
    path: 'home-dash/:id',
    component: UserHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'course/:id',
    component: CoursepageComponent,
    canActivate: [authGuard],
  },
  { path: 'study/:id', component: StudyComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  {
    path: 'subject/:id',
    component: StudyContentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'completed/:id',
    component: CompletedCourseComponent,
    canActivate: [authGuard],
  },
  { path: 'test/:id', component: ExamComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
