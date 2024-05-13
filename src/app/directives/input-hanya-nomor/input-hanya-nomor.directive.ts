import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[prappdbInputHanyaNomor]'
})
export class InputHanyaNomorDirective {
  @Input() maxLength: number = 16; // Panjang maksimum digit, default 16
  @Input() zero: boolean = false; // Panjang maksimum digit, default 16
  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Menghapus karakter non-angka dan tanda minus
    let newValue = value.replace(/[^0-9]/g, '');
    if (this.zero === true) {
      // if (newValue.length < this.maxLength) {
      //   while (newValue.length < this.maxLength) {
      //     newValue = '0' + newValue;
      //   }
      // }
    }
    newValue = newValue.slice(0, this.maxLength);
    // Mengupdate nilai input dengan nilai yang telah difilter
    this.ngControl.valueAccessor?.writeValue(newValue);
  }
}
