import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentcaptureComponent } from './prgstudentcapture.component';

describe('PrgstudentcaptureComponent', () => {
  let component: PrgstudentcaptureComponent;
  let fixture: ComponentFixture<PrgstudentcaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrgstudentcaptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrgstudentcaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
