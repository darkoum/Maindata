import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentmasterComponent } from './prgstudentmaster.component';

describe('PrgstudentmasterComponent', () => {
  let component: PrgstudentmasterComponent;
  let fixture: ComponentFixture<PrgstudentmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
