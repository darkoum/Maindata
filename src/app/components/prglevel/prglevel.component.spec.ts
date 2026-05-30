import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrglevelComponent } from './prglevel.component';

describe('PrglevelComponent', () => {
  let component: PrglevelComponent;
  let fixture: ComponentFixture<PrglevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrglevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrglevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
