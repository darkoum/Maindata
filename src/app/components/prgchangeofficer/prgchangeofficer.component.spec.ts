import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgchangeofficerComponent } from './prgchangeofficer.component';

describe('PrgchangeofficerComponent', () => {
  let component: PrgchangeofficerComponent;
  let fixture: ComponentFixture<PrgchangeofficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgchangeofficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgchangeofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
