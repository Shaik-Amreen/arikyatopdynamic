import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsOfferStatusComponent } from './students-offer-status.component';

describe('StudentsOfferStatusComponent', () => {
  let component: StudentsOfferStatusComponent;
  let fixture: ComponentFixture<StudentsOfferStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsOfferStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsOfferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
