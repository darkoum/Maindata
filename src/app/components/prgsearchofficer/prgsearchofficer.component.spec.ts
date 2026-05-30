import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgsearchofficerComponent } from './prgsearchofficer.component';

describe('PrgsearchofficerComponent', () => {
  let component: PrgsearchofficerComponent;
  let fixture: ComponentFixture<PrgsearchofficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgsearchofficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgsearchofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
