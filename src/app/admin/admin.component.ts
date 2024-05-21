import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Course } from '../Properties';
import { AdminService } from '../service/admin.service';
import { finalize } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnDestroy {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('listened');
    }
  }

  constructor(private service: AdminService) {}
  ngOnDestroy(): void {
    this.submit().unsubscribe();
  }

  successMeassage!: string;
  openDialog(): void {
    var doc = document.getElementById('success');
    if (doc) {
      doc.style.display = 'block';
    }
  }
  closDialog() {
    var doc = document.getElementById('success');
    if (doc) {
      doc.style.display = 'none';
    }
  }

  submit() {
    console.log(this.thumbnail.value);
    var doc = document.getElementById('p-bar')?.classList.add('visible');

    return this.service
      .addCourse(this.addCourse.value, this.thumbnailImage)
      .pipe(
        finalize(() => {
          var doc = document
            .getElementById('p-bar')
            ?.classList.remove('visible');
          this.uploadProgress = 0;
          this.addCourse.reset();
          this.thumbnail.reset();
        })
      )
      .subscribe(
        (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total!)
            );
          }
          console.log('hit here');
          if (event.type == HttpEventType.Response) {
            this.successMeassage = event.body!;
            this.openDialog();
          }
        },
        (error) => {window.alert('something went wrong')}
      );
  }

  thumbnailImage!: File;
  thumbnail_name!: string;
  uploadProgress = 0;

  onImageSelected($event: Event) {
    if (event) {
      let image = event.currentTarget as HTMLInputElement;
      let images = image.files;
      if (images) {
        let thumbnail = images[0];
        console.log('this is your thumbnail   ', thumbnail);
        this.thumbnail_name = thumbnail.name;
        this.thumbnailImage = thumbnail;
      }
    } else {
      throw new Error('no image selected or invalid image');
    }
  }

  thumbnail = new FormControl();
  // Subject = new FormGroup({
  //   name: new FormControl()
  // });

  addCourse = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    subjects: new FormArray(
      [
        new FormGroup({
          name: new FormControl(''),
        }),
      ],
      [Validators.required]
    ),
  });
  // subjects = new FormArray([
  //   new FormGroup({name:new FormControl('')})
  // ]);
  stopkeyevent() {
    let doc = document.getElementById('subject-name');
    if (doc) {
      doc.addEventListener('keypress', (event) => {
        if (event.key == 'enter') {
          event.preventDefault();
        }
      });
    }
  }
  get subjects() {
    return this.addCourse.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjects.push(new FormGroup({ name: new FormControl('') }));
  }

  removeSubject(i: number) {
    this.subjects.removeAt(i);
  }

  addcourse() {}

  course!: Course;
}
