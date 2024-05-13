import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[prappdbInputAngkaTigaDigit]'
})
export class InputAngkaTigaDigitDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Menghapus karakter selain angka
    const newValue = value.replace(/\D/g, '');
    // Menambahkan nol di depan jika panjangnya kurang dari 3
    const paddedValue = this.padNumber(newValue, 3);
    // Memperbarui nilai input dengan nilai yang telah diproses
    this.el.nativeElement.value = paddedValue;
  }

  // Fungsi untuk menambahkan nol di depan jika panjangnya kurang dari digitCount
  padNumber(value: string, digitCount: number): string {
    let paddedValue = value;
    while (paddedValue.length < digitCount) {
      paddedValue = '0' + paddedValue;
    }
    return paddedValue;
  }
}
