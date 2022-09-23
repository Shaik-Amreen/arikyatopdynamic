import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementsReportsComponent } from './placements-reports.component';

describe('PlacementsReportsComponent', () => {
  let component: PlacementsReportsComponent;
  let fixture: ComponentFixture<PlacementsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
