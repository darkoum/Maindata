import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrggraduateprogramsetComponent } from './prggraduateprogramset.component';

describe('PrggraduateprogramsetComponent', () => {
  let component: PrggraduateprogramsetComponent;
  let fixture: ComponentFixture<PrggraduateprogramsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrggraduateprogramsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrggraduateprogramsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
