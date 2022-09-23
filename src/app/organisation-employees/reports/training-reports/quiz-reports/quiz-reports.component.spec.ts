import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizReportsComponent } from './quiz-reports.component';

describe('QuizReportsComponent', () => {
  let component: QuizReportsComponent;
  let fixture: ComponentFixture<QuizReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
