import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTopicsComponent } from './code-topics.component';

describe('CodeTopicsComponent', () => {
  let component: CodeTopicsComponent;
  let fixture: ComponentFixture<CodeTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
