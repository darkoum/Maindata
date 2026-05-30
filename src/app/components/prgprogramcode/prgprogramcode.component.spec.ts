import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprogramcodeComponent } from './prgprogramcode.component';

describe('PrgprogramcodeComponent', () => {
  let component: PrgprogramcodeComponent;
  let fixture: ComponentFixture<PrgprogramcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprogramcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprogramcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
