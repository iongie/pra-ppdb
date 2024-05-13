import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KonfirmasiComponent } from './konfirmasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: KonfirmasiComponent
  }
];

@NgModule({
  declarations: [
    KonfirmasiComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class KonfirmasiModule { }
