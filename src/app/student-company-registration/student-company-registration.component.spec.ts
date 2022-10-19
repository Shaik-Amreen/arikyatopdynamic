import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyRegistrationComponent } from './student-company-registration.component';

describe('StudentCompanyRegistrationComponent', () => {
  let component: StudentCompanyRegistrationComponent;
  let fixture: ComponentFixture<StudentCompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCompanyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
