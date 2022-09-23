import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsershomeComponent } from './usershome.component';

describe('UsershomeComponent', () => {
  let component: UsershomeComponent;
  let fixture: ComponentFixture<UsershomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsershomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsershomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
