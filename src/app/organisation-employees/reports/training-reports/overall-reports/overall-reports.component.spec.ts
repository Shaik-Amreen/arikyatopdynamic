import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallReportsComponent } from './overall-reports.component';

describe('OverallReportsComponent', () => {
  let component: OverallReportsComponent;
  let fixture: ComponentFixture<OverallReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
