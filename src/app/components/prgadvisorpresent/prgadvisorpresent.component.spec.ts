import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgadvisorpresentComponent } from './prgadvisorpresent.component';

describe('PrgadvisorpresentComponent', () => {
  let component: PrgadvisorpresentComponent;
  let fixture: ComponentFixture<PrgadvisorpresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgadvisorpresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgadvisorpresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
