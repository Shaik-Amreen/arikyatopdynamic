import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTopicDetailsComponent } from './quiz-topic-details.component';

describe('QuizTopicDetailsComponent', () => {
  let component: QuizTopicDetailsComponent;
  let fixture: ComponentFixture<QuizTopicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizTopicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
