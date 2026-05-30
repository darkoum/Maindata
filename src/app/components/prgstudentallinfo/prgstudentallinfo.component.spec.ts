import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentallinfoComponent } from './prgstudentallinfo.component';

describe('PrgstudentallinfoComponent', () => {
  let component: PrgstudentallinfoComponent;
  let fixture: ComponentFixture<PrgstudentallinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentallinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentallinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
