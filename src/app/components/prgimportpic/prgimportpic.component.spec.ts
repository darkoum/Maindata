import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgimportpicComponent } from './prgimportpic.component';

describe('PrgimportpicComponent', () => {
  let component: PrgimportpicComponent;
  let fixture: ComponentFixture<PrgimportpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgimportpicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgimportpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
