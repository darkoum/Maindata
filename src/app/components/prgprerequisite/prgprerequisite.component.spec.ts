import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprerequisiteComponent } from './prgprerequisite.component';

describe('PrgprerequisiteComponent', () => {
  let component: PrgprerequisiteComponent;
  let fixture: ComponentFixture<PrgprerequisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprerequisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprerequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
