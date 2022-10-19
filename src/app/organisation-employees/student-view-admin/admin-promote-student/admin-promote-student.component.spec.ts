import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoteStudentComponent } from './admin-promote-student.component';

describe('AdminPromoteStudentComponent', () => {
  let component: AdminPromoteStudentComponent;
  let fixture: ComponentFixture<AdminPromoteStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromoteStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromoteStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
