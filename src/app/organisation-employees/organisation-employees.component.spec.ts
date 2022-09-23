import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEmployeesComponent } from './organisation-employees.component';

describe('OrganisationEmployeesComponent', () => {
  let component: OrganisationEmployeesComponent;
  let fixture: ComponentFixture<OrganisationEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
