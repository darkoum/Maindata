import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrgtmpimpregComponent } from './prgtmpimpreg.component';

describe('PrgtmpimpregComponent', () => {
  let component: PrgtmpimpregComponent;
  let fixture: ComponentFixture<PrgtmpimpregComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ PrgtmpimpregComponent ]
      })
      .compileComponents();
    });
  beforeEach(() => {
    fixture = TestBed.createComponent(PrgtmpimpregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
