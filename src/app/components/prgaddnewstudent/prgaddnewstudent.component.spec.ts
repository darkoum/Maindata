import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgaddnewstudentComponent } from './prgaddnewstudent.component';

describe('PrgaddnewstudentComponent', () => {
  let component: PrgaddnewstudentComponent;
  let fixture: ComponentFixture<PrgaddnewstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgaddnewstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgaddnewstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
