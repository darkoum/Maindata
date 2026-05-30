import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgsearchstudentComponent } from './prgsearchstudent.component';

describe('PrgsearchstudentComponent', () => {
  let component: PrgsearchstudentComponent;
  let fixture: ComponentFixture<PrgsearchstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgsearchstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgsearchstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
