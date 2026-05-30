import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgdivisioncodeComponent } from './prgdivisioncode.component';

describe('PrgdivisioncodeComponent', () => {
  let component: PrgdivisioncodeComponent;
  let fixture: ComponentFixture<PrgdivisioncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgdivisioncodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgdivisioncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
