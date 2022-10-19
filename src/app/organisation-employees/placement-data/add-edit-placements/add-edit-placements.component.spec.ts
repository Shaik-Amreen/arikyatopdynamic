import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlacementsComponent } from './add-edit-placements.component';

describe('AddEditPlacementsComponent', () => {
  let component: AddEditPlacementsComponent;
  let fixture: ComponentFixture<AddEditPlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
