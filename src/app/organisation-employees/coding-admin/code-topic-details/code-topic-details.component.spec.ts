import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTopicDetailsComponent } from './code-topic-details.component';

describe('CodeTopicDetailsComponent', () => {
  let component: CodeTopicDetailsComponent;
  let fixture: ComponentFixture<CodeTopicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTopicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
