import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprovinceconfigComponent } from './prgprovinceconfig.component';

describe('PrgprovinceconfigComponent', () => {
  let component: PrgprovinceconfigComponent;
  let fixture: ComponentFixture<PrgprovinceconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprovinceconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprovinceconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
