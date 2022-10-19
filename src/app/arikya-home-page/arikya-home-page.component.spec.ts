import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArikyaHomePageComponent } from './arikya-home-page.component';

describe('ArikyaHomePageComponent', () => {
  let component: ArikyaHomePageComponent;
  let fixture: ComponentFixture<ArikyaHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArikyaHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArikyaHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
