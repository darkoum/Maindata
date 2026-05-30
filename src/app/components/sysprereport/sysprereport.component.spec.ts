import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysprereportComponent } from './sysprereport.component';

describe('SysprereportComponent', () => {
  let component: SysprereportComponent;
  let fixture: ComponentFixture<SysprereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysprereportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysprereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
