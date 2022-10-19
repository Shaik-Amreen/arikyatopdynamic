import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddStudentsComponent } from './admin-add-students.component';

describe('AdminAddStudentsComponent', () => {
  let component: AdminAddStudentsComponent;
  let fixture: ComponentFixture<AdminAddStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});