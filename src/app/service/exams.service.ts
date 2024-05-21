import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { Question } from '../Properties';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  constructor(private http: HttpClient) {}

  Path = 'api/hackerX/course';

  updateScore(score: number, userid: any, courseId: any) {
    return this.http
      .get(this.Path + '/test_score', {
        params: { userId: userid, courseId: courseId,'score':score },
      });
  }

  getexams(id: any, courseId: string) {
    return this.http
      .get<Question[]>(this.Path + '/general_test', {
        params: { courseId: courseId, userid: id },
      })
      .pipe();
  }

  scoreUser(questions: Question[], total: number) {
    let score = 0;
    for (let question of questions) {
      if (
        question.selected_option.match(question.correctOption.toLowerCase())
      )
       {
        console.log(question.selected_option === question.correctOption.toLowerCase());
        
        console.log(score);
        score++;
      }
      
    }
    console.log(((score * 100) / total));
    
    return ((score * 100) / total);
  }
}
