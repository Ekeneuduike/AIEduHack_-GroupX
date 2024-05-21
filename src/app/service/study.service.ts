import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Course, CourseDto, Question } from '../Properties';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
 
  constructor(private client: HttpClient) {}
 

  Path = 'api/hackerX/course';
  Ai_Path = 'api/hackerX/home/ask';

  currentCourse!: CourseDto;


  getQuestions(studentId:any,courseId:any,studyid:any) {
   return this.client.get<Question[]>(this.Path+"/stimulated_test",{params:{'course_id':courseId,'studentId':studentId,'studyId':studyid}})
    .pipe()
  }

  study(userId: any, subjectId: any, courseId: any) {
    return this.client.get(this.Path + '/study', {
      params: { 'userId': userId, 'subjectId': subjectId, 'courseId': courseId },responseType:'text'
    });
  }

  askAi(question: any) {
    return this.client
      .get(this.Ai_Path, {
        params: { question: question },
        responseType: 'text',
      })
      .pipe();
  }

  setCurrentCourse(course: CourseDto) {
    this.currentCourse = course;
  }

  getSubject(id: string) {
    return this.client.get<CourseDto>(this.Path + `/course/${id}`).pipe();
  }
}
