import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputHanyaNomorDirective } from './input-hanya-nomor/input-hanya-nomor.directive';
import { InputHanyaHurufDirective } from './input-hanya-huruf/input-hanya-huruf.directive';
import { InputAngkaTigaDigitDirective } from './input-angka-tiga-digit/input-angka-tiga-digit.directive';



@NgModule({
  declarations: [
    InputHanyaNomorDirective,
    InputHanyaHurufDirective,
    InputAngkaTigaDigitDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputHanyaNomorDirective,
    InputHanyaHurufDirective,
    InputAngkaTigaDigitDirective
  ]
})
export class DirectivesModule { }
