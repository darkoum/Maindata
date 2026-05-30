import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgschoolComponent } from './prgschool.component';

describe('PrgschoolComponent', () => {
  let component: PrgschoolComponent;
  let fixture: ComponentFixture<PrgschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
