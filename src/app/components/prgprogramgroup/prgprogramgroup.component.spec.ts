import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprogramgroupComponent } from './prgprogramgroup.component';

describe('PrgprogramgroupComponent', () => {
  let component: PrgprogramgroupComponent;
  let fixture: ComponentFixture<PrgprogramgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprogramgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprogramgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
