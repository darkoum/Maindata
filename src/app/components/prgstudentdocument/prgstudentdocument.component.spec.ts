import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentdocumentComponent } from './prgstudentdocument.component';

describe('PrgstudentdocumentComponent', () => {
  let component: PrgstudentdocumentComponent;
  let fixture: ComponentFixture<PrgstudentdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrgstudentdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrgstudentdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
