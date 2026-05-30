import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentlogComponent } from './prgstudentlog.component';

describe('PrgstudentlogComponent', () => {
  let component: PrgstudentlogComponent;
  let fixture: ComponentFixture<PrgstudentlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrgstudentlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
