import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanywisePlacementReportsComponent } from './companywise-placement-reports.component';

describe('CompanywisePlacementReportsComponent', () => {
  let component: CompanywisePlacementReportsComponent;
  let fixture: ComponentFixture<CompanywisePlacementReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanywisePlacementReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanywisePlacementReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
