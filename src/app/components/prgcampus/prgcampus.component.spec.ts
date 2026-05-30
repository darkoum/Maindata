import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgcampusComponent } from './prgcampus.component';

describe('PrgcampusComponent', () => {
  let component: PrgcampusComponent;
  let fixture: ComponentFixture<PrgcampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgcampusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgcampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
