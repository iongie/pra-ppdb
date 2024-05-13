import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidasiRegistrasiComponent } from './validasi-registrasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentUtamaModule } from '../../components/utama-component.module';

const routes: Routes = [
  {
    path: '',
    component: ValidasiRegistrasiComponent
  }
];

@NgModule({
  declarations: [
    ValidasiRegistrasiComponent
  ],
  imports: [
    CommonModule,
    ComponentUtamaModule,
    RouterModule.forChild(routes)
  ]
})
export class ValidasiRegistrasiModule { }
