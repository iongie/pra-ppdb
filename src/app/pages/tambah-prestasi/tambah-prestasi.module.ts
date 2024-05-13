import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TambahPrestasiComponent } from './tambah-prestasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: TambahPrestasiComponent
  }
];

@NgModule({
  declarations: [
    TambahPrestasiComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class TambahPrestasiModule { }
