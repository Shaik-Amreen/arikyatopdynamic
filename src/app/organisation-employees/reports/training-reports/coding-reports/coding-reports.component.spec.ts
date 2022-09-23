import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingReportsComponent } from './coding-reports.component';

describe('CodingReportsComponent', () => {
  let component: CodingReportsComponent;
  let fixture: ComponentFixture<CodingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
