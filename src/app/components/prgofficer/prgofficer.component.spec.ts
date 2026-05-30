import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgofficerComponent } from './prgofficer.component';

describe('PrgofficerComponent', () => {
  let component: PrgofficerComponent;
  let fixture: ComponentFixture<PrgofficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgofficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
