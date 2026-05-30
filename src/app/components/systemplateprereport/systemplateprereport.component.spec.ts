import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemplateprereportComponent } from './systemplateprereport.component';

describe('SystemplateprereportComponent', () => {
  let component: SystemplateprereportComponent;
  let fixture: ComponentFixture<SystemplateprereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemplateprereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemplateprereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
