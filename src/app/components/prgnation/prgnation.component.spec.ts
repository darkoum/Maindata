import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgnationComponent } from './prgnation.component';

describe('PrgnationComponent', () => {
  let component: PrgnationComponent;
  let fixture: ComponentFixture<PrgnationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgnationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
