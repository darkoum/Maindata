import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgfacultyComponent } from './prgfaculty.component';

describe('PrgfacultyComponent', () => {
  let component: PrgfacultyComponent;
  let fixture: ComponentFixture<PrgfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgfacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
