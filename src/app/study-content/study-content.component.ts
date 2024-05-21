import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudyService } from '../service/study.service';
import { FormControl, Validators } from '@angular/forms';
import { ChatDetails, Question } from '../Properties';
import { Router } from '@angular/router';
import { finalize, never } from 'rxjs';
import { ExamsService } from '../service/exams.service';

@Component({
  selector: 'app-study-content',
  templateUrl: './study-content.component.html',
  styleUrls: ['./study-content.component.css'],
})
export class StudyContentComponent implements OnInit, OnDestroy {

  constructor(
    private service: StudyService,
    private router: Router,
    private exam: ExamsService
  ) {}
  ngOnInit(): void {
    this.study();
  }
  ngOnDestroy(): void {
    this.study().unsubscribe();
    this.askai().unsubscribe();
  }

  question = new FormControl('', Validators.required);
 i= 0;
  studycontent: any;
  currentuser = JSON.parse(localStorage.getItem('currentUser')!);
  currentCourse = JSON.parse(localStorage.getItem('currentCourse')!);
  subjectid = this.router.url.substring(9);
  questions!: Question[];
  score!: number;
  chatdetails:ChatDetails[] = new Array();

  getselectedOption(index: number, data: any) {
    let selected = data.target.value;
    let currentQuestion = this.questions.at(index);
    if (currentQuestion) {
      currentQuestion.selected_option = selected;
    }
  }
 
  getscore() {
    let score = (this.score = this.exam.scoreUser(this.questions, 5));
    var doc = document.getElementById('mes1')?.classList.add('open-me');
  }

  askai() {
    var doc = document.getElementById('load');
    var doc1 = document.getElementById('chat-error');
    if (doc && doc1) {
      console.log('hello');
      doc.style.display = 'inline-block';
      doc1.style.display = 'none'
    }
    this.chatdetails.push({question:'',response:''});
    let chat = this.chatdetails.at(this.i);
    if(chat){chat.question=this.question.value!}
    return this.service.askAi(this.question.value).subscribe((next) => {
      if(chat){chat.response=next}
      this.question.reset();
      if (doc) {
        doc.style.display = 'none';
      }
      this.i++;
    },
    (error)=>{
      console.log(error)
      if(doc && doc1){
        doc1.style.display = 'block';
        doc.style.display = "none";
        this.question.reset();
        console.log('here is the ', error)
      }
    }
  
    );
  }
  openchat() {
    document.getElementById('chatbox')?.classList.add('open');
    document.getElementById('chaticon')?.classList.add('close');
    document.getElementById('test-btn')?.classList.add('close');
    
  }
  closechat() {
    var doc1 = document.getElementById('chat-error');
    var doc = document.getElementById('load');
    document.getElementById('test-btn')?.classList.remove('close')
    if(doc1 && doc){
      doc1.style.display = 'none'
      doc.style.display = 'none'
    }
    document.getElementById('chatbox')?.classList.remove('open');
    document.getElementById('chaticon')?.classList.remove('close');
  }
  getQuestions() {
    return this.service
      .getQuestions(this.currentuser.id, this.currentCourse.id, this.subjectid)
      .pipe(
        finalize(() => {
          let doc = document.getElementById('myload');
          if (doc) {
            doc.style.display = 'none';
          }
        })
      )
      .subscribe(
        (next) => {
          this.questions = next.map((next) => {
            let question: Question = {
              id: next.id,
              name: next.name,
              questions: next.questions,
              options: next.options,
              correctOption: next.correctOption,
              selected_option: next.selected_option,
            };
            return question;
          });
          console.log(this.questions);
        },
        (error) => {
          let doc = document.getElementById('e2');
          if (doc) {
            doc.style.display = 'block';
          }
        }
      );
  }
  startTest() {
    var doc = document.getElementById('q1');
    if (doc) {
      console.log('reached here');
      doc.style.display = 'block';
    }
    console.log(this.currentuser.id, this.currentCourse.id);
    console.log(this.subjectid);
    this.getQuestions();
  }
  closeTest() {
    var doc = document.getElementById('q1');
    if (doc) {
      console.log('reached here');
      doc.style.display = 'none';
    }
     document.getElementById('mes1')?.classList.remove('open-me');
    this.getQuestions().unsubscribe();
    this.questions = new Array();
  }
  
  study() {
    console.log(this.currentuser.id, this.subjectid, this.currentCourse.id);

    return this.service
      .study(this.currentuser.id, this.subjectid, this.currentCourse.id)
      .pipe(
        finalize(() => {
          var doc = document.getElementById('loading');
          if (doc) {
            doc.style.display = 'none';
          }
        })
      )
      .subscribe(
        (next) => {
          this.studycontent = next;
        },
        (error) => {
          let doc = document.getElementById('error');
          if (doc) {
            doc.style.display = 'flex';
          }
        }
      );
  }

  getCurrentCourse() {
    let currentCourse = JSON.parse(localStorage.getItem('currentCourse')!);
    return currentCourse;
  }
}
