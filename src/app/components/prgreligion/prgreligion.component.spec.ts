import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgreligionComponent } from './prgreligion.component';

describe('PrgreligionComponent', () => {
  let component: PrgreligionComponent;
  let fixture: ComponentFixture<PrgreligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgreligionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgreligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
