import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepexportqueryComponent } from './repexportquery.component';

describe('RepexportqueryComponent', () => {
  let component: RepexportqueryComponent;
  let fixture: ComponentFixture<RepexportqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepexportqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepexportqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
