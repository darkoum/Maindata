import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgprefixComponent } from './prgprefix.component';

describe('PrgprefixComponent', () => {
  let component: PrgprefixComponent;
  let fixture: ComponentFixture<PrgprefixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgprefixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgprefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
