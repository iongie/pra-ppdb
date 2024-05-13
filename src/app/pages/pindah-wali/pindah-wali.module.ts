import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PindahWaliComponent } from './pindah-wali.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: PindahWaliComponent
  }
];

@NgModule({
  declarations: [
    PindahWaliComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class PindahWaliModule { }
