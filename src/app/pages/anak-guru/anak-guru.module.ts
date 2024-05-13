import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnakGuruComponent } from './anak-guru.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path: '',
    component: AnakGuruComponent
  }
];

@NgModule({
  declarations: [
    AnakGuruComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class AnakGuruModule { }
