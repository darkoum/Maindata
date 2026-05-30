import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgofficertypeComponent } from './prgofficertype.component';

describe('PrgofficertypeComponent', () => {
  let component: PrgofficertypeComponent;
  let fixture: ComponentFixture<PrgofficertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgofficertypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgofficertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
