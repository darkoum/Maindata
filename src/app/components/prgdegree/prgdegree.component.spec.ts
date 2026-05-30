import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgdegreeComponent } from './prgdegree.component';

describe('PrgdegreeComponent', () => {
  let component: PrgdegreeComponent;
  let fixture: ComponentFixture<PrgdegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgdegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgdegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
