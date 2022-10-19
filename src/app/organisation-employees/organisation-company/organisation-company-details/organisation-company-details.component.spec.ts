import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCompanyDetailsComponent } from './organisation-company-details.component';

describe('OrganisationCompanyDetailsComponent', () => {
  let component: OrganisationCompanyDetailsComponent;
  let fixture: ComponentFixture<OrganisationCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
