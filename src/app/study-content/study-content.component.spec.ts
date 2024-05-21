import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyContentComponent } from './study-content.component';

describe('StudyContentComponent', () => {
  let component: StudyContentComponent;
  let fixture: ComponentFixture<StudyContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyContentComponent]
    });
    fixture = TestBed.createComponent(StudyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
