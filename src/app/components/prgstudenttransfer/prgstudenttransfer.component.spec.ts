import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudenttransferComponent } from './prgstudenttransfer.component';

describe('PrgstudenttranferComponent', () => {
  let component: PrgstudenttransferComponent;
  let fixture: ComponentFixture<PrgstudenttransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudenttransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudenttransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
