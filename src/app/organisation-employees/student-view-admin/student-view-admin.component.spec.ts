import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewAdminComponent } from './student-view-admin.component';

describe('StudentViewAdminComponent', () => {
  let component: StudentViewAdminComponent;
  let fixture: ComponentFixture<StudentViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
