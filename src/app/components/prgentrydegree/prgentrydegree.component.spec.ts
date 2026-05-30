import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgentrydegreeComponent } from './prgentrydegree.component';

describe('PrgentrydegreeComponent', () => {
  let component: PrgentrydegreeComponent;
  let fixture: ComponentFixture<PrgentrydegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgentrydegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgentrydegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
