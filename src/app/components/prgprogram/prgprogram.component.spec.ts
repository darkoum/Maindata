import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprogramComponent } from './prgprogram.component';

describe('PrgprogramComponent', () => {
  let component: PrgprogramComponent;
  let fixture: ComponentFixture<PrgprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
