import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEmployeesProfileComponent } from './organisation-employees-profile.component';

describe('OrganisationEmployeesProfileComponent', () => {
  let component: OrganisationEmployeesProfileComponent;
  let fixture: ComponentFixture<OrganisationEmployeesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationEmployeesProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEmployeesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
