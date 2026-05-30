import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrglevelcodeComponent } from './prglevelcode.component';

describe('PrglevelcodeComponent', () => {
  let component: PrglevelcodeComponent;
  let fixture: ComponentFixture<PrglevelcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrglevelcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrglevelcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
