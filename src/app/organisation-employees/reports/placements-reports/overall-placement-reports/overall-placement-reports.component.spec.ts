import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallPlacementReportsComponent } from './overall-placement-reports.component';

describe('OverallPlacementReportsComponent', () => {
  let component: OverallPlacementReportsComponent;
  let fixture: ComponentFixture<OverallPlacementReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallPlacementReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallPlacementReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
