import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgwebmsgComponent } from './prgwebmsg.component';

describe('PrgwebmsgComponent', () => {
  let component: PrgwebmsgComponent;
  let fixture: ComponentFixture<PrgwebmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgwebmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgwebmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
