import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidasiProsesRegistrasiComponent } from './validasi-proses-registrasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentUtamaModule } from '../../components/utama-component.module';

const routes: Routes = [
  {
    path: '',
    component: ValidasiProsesRegistrasiComponent
  }
];

@NgModule({
  declarations: [
    ValidasiProsesRegistrasiComponent
  ],
  imports: [
    CommonModule,
    ComponentUtamaModule,
    RouterModule.forChild(routes)
  ]
})
export class ValidasiProsesRegistrasiModule { }
