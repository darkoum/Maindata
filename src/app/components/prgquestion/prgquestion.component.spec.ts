import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgquestionComponent } from './prgquestion.component';

describe('PrgquestionComponent', () => {
  let component: PrgquestionComponent;
  let fixture: ComponentFixture<PrgquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
