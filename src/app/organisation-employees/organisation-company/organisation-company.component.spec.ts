import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCompanyComponent } from './organisation-company.component';

describe('OrganisationCompanyComponent', () => {
  let component: OrganisationCompanyComponent;
  let fixture: ComponentFixture<OrganisationCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
