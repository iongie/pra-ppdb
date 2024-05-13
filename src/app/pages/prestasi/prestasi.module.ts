import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestasiComponent } from './prestasi.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: PrestasiComponent
  }
];

@NgModule({
  declarations: [
    PrestasiComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class PrestasiModule { }
