import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentResultComponent } from './admin-student-result.component';

describe('AdminStudentResultComponent', () => {
  let component: AdminStudentResultComponent;
  let fixture: ComponentFixture<AdminStudentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
