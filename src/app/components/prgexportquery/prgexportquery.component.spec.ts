import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgexportqueryComponent } from './prgexportquery.component';

describe('PrgexportqueryComponent', () => {
  let component: PrgexportqueryComponent;
  let fixture: ComponentFixture<PrgexportqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgexportqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgexportqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
