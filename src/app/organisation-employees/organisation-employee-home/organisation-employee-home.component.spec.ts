import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEmployeeHomeComponent } from './organisation-employee-home.component';

describe('OrganisationEmployeeHomeComponent', () => {
  let component: OrganisationEmployeeHomeComponent;
  let fixture: ComponentFixture<OrganisationEmployeeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationEmployeeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEmployeeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
