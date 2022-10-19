import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementsHomeComponent } from './placements-home.component';

describe('PlacementsHomeComponent', () => {
  let component: PlacementsHomeComponent;
  let fixture: ComponentFixture<PlacementsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
