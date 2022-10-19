import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentBacklogComponent } from './admin-student-backlog.component';

describe('AdminStudentBacklogComponent', () => {
  let component: AdminStudentBacklogComponent;
  let fixture: ComponentFixture<AdminStudentBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentBacklogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
