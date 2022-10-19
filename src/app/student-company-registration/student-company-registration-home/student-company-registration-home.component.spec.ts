import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyRegistrationHomeComponent } from './student-company-registration-home.component';

describe('StudentCompanyRegistrationHomeComponent', () => {
  let component: StudentCompanyRegistrationHomeComponent;
  let fixture: ComponentFixture<StudentCompanyRegistrationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCompanyRegistrationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyRegistrationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
