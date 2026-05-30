import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgexportstudentimgComponent } from './prgexportstudentimg.component';

describe('PrgexportstudentimgComponent', () => {
  let component: PrgexportstudentimgComponent;
  let fixture: ComponentFixture<PrgexportstudentimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgexportstudentimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgexportstudentimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
