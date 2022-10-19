import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentProfileComponent } from './admin-student-profile.component';

describe('AdminStudentProfileComponent', () => {
  let component: AdminStudentProfileComponent;
  let fixture: ComponentFixture<AdminStudentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
