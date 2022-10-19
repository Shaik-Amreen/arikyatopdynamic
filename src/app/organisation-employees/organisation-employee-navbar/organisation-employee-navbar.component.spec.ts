import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEmployeeNavbarComponent } from './organisation-employee-navbar.component';

describe('OrganisationEmployeeNavbarComponent', () => {
  let component: OrganisationEmployeeNavbarComponent;
  let fixture: ComponentFixture<OrganisationEmployeeNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationEmployeeNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationEmployeeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
