import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfirmasiComponent } from './afirmasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: AfirmasiComponent
  }
];


@NgModule({
  declarations: [
    AfirmasiComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class AfirmasiModule { }
