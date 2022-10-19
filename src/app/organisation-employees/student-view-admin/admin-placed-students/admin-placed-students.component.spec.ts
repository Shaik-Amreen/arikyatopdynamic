import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlacedStudentsComponent } from './admin-placed-students.component';

describe('AdminPlacedStudentsComponent', () => {
  let component: AdminPlacedStudentsComponent;
  let fixture: ComponentFixture<AdminPlacedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlacedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlacedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
