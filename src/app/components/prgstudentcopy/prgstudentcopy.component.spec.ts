import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentcopyComponent } from './prgstudentcopy.component';

describe('PrgstudentcopyComponent', () => {
  let component: PrgstudentcopyComponent;
  let fixture: ComponentFixture<PrgstudentcopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentcopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
