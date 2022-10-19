import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArikyaContactComponent } from './arikya-contact.component';

describe('ArikyaContactComponent', () => {
  let component: ArikyaContactComponent;
  let fixture: ComponentFixture<ArikyaContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArikyaContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArikyaContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
