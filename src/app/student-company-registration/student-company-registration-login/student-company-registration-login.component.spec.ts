import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyRegistrationLoginComponent } from './student-company-registration-login.component';

describe('StudentCompanyRegistrationLoginComponent', () => {
  let component: StudentCompanyRegistrationLoginComponent;
  let fixture: ComponentFixture<StudentCompanyRegistrationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCompanyRegistrationLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyRegistrationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
