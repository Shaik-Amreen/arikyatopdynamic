import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchStudentsComponent } from './admin-search-students.component';

describe('AdminSearchStudentsComponent', () => {
  let component: AdminSearchStudentsComponent;
  let fixture: ComponentFixture<AdminSearchStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSearchStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSearchStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
