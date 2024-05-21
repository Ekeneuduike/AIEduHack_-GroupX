import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamsService } from '../service/exams.service';
import { finalize } from 'rxjs';
import { Question } from '../Properties';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit ,OnDestroy{


  ngOnInit(): void {
    this.getExams()
  }
  ngOnDestroy(): void {
    this.getExams().unsubscribe()
  }
  constructor(private router:Router,private service:ExamsService){}
  
  currentuser = JSON.parse(localStorage.getItem('currentUser')!);
  currentCourse = JSON.parse(localStorage.getItem('currentCourse')!);
  courseId = this.router.url.substring(6);
  questions!:Question[];
  score:number = 0;

  scoreUser() {
    this.score = this.service.scoreUser(this.questions,15);
    this.service.updateScore(this.score,this.currentuser.id,this.courseId)
    .pipe(
      finalize(()=>{

      })
      )
    .subscribe((next)=>{
      var doc = document.getElementById('mes1')?.classList.add('open-me');
    });
  }

  setSelectedOption(i: number,value:any) {
   let currentQuestion = this.questions.at(i);
   let answer =value.target.value;
   if(currentQuestion){
    currentQuestion.selected_option = answer; console.log(this.questions.at(i));
   }
  }

  getExams(){
  return this.service.getexams(this.currentuser.id,this.courseId)
  .pipe(finalize(()=>{
    var doc = document.getElementById('loading')
    if(doc){
    doc.style.display = 'none';
    }
  }))
  .subscribe(
    (next)=>{
    this.questions= next;
    },
    (error)=>{
     let doc = document.getElementById('error');
     if(doc){
      doc.style.display = 'flex'
     }
    }
  );
  }
  
}
