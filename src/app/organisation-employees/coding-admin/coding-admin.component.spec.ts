import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingAdminComponent } from './coding-admin.component';

describe('CodingAdminComponent', () => {
  let component: CodingAdminComponent;
  let fixture: ComponentFixture<CodingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
