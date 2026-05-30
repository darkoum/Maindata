import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgcountryComponent } from './prgcountry.component';

describe('PrgcountryComponent', () => {
  let component: PrgcountryComponent;
  let fixture: ComponentFixture<PrgcountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgcountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
