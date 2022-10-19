import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCompanyHomeComponent } from './organisation-company-home.component';

describe('OrganisationCompanyHomeComponent', () => {
  let component: OrganisationCompanyHomeComponent;
  let fixture: ComponentFixture<OrganisationCompanyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCompanyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationCompanyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
