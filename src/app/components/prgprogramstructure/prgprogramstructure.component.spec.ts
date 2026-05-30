import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprogramstructureComponent } from './prgprogramstructure.component';

describe('PrgprogramstructureComponent', () => {
  let component: PrgprogramstructureComponent;
  let fixture: ComponentFixture<PrgprogramstructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprogramstructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprogramstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
