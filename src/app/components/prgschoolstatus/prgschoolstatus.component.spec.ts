import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgschoolstatusComponent } from './prgschoolstatus.component';

describe('PrgschoolstatusComponent', () => {
  let component: PrgschoolstatusComponent;
  let fixture: ComponentFixture<PrgschoolstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgschoolstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgschoolstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
