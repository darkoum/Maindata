import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentsetComponent } from './prgstudentset.component';

describe('PrgstudentsetComponent', () => {
  let component: PrgstudentsetComponent;
  let fixture: ComponentFixture<PrgstudentsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
