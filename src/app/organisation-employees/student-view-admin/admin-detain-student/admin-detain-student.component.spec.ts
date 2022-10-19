import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetainStudentComponent } from './admin-detain-student.component';

describe('AdminDetainStudentComponent', () => {
  let component: AdminDetainStudentComponent;
  let fixture: ComponentFixture<AdminDetainStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetainStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetainStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
