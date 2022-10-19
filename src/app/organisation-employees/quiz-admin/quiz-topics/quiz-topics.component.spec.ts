import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTopicsComponent } from './quiz-topics.component';

describe('QuizTopicsComponent', () => {
  let component: QuizTopicsComponent;
  let fixture: ComponentFixture<QuizTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
