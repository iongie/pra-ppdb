import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[prappdbInputHanyaHuruf]'
})
export class InputHanyaHurufDirective {
  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    let newValue = value.replace(/[^a-zA-Z\s]/g, '')
    this.ngControl.valueAccessor?.writeValue(newValue);
  }
}
