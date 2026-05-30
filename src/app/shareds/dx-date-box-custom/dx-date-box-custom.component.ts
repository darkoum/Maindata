import { Component, EventEmitter, Input, Output } from '@angular/core';
import { locale } from 'devextreme/localization';

@Component({
    standalone: false,
  selector: 'dx-date-box-custom',
  template: ` <dx-date-box
    [showClearButton]="showClearButton"
    [type]="type"
    [(ngModel)]="date"
    (onKeyUp)="onKeyUp($event)"
    (onValueChanged)="ValueChanged($event)"
    [disabled]="disabled"
  ></dx-date-box>`,
})
export class DxDateBoxCustomComponent {
  @Input() date: Date | undefined;
  @Output() onValueChanged = new EventEmitter<any>();
  @Input() showClearButton: boolean = false;
  @Input() type: string = 'date';
  @Input() disabled: boolean = false;
  locale: string = 'th';

  constructor() {
    locale(this.locale); // Not necessary
  }

  ValueChanged(value: any) {
    
    // if (value.value) {
    //   this.onValueChanged.emit(value);
    // }
      this.onValueChanged.emit(value);
  }

  onKeyUp(event: any) {
    if (this.locale !== 'th') return;
    const inputValue = event.event.currentTarget.value;
    if (
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(
        inputValue
      )
    ) {
      const [d, m, y] = inputValue.split('/');
      const utcYear = y - 543;
      this.date = new Date(utcYear, +m - 1, +d);
    } else {
      if (
        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}\s([01][0-9]|[2][0-4]):[0-5][0-9]?$/.test(
          inputValue
        )
      ) {
        const [dd, tt] = inputValue.split(' ');
        const [d, m, y] = dd.split('/');
        const [hh, mm] = tt.split(':');
        const utcYear = y - 543;
        this.date = new Date(utcYear, +m - 1, +d, +hh, +mm);
      }
    }
  }
}
