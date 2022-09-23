import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementDataComponent } from './placement-data.component';

describe('PlacementDataComponent', () => {
  let component: PlacementDataComponent;
  let fixture: ComponentFixture<PlacementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
