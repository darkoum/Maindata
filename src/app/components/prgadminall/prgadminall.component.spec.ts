import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgadminallComponent } from './prgadminall.component';

describe('PrgadminallComponent', () => {
  let component: PrgadminallComponent;
  let fixture: ComponentFixture<PrgadminallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgadminallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgadminallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
