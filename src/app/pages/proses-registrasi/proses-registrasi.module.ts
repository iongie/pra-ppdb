import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProsesRegistrasiComponent } from './proses-registrasi.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProsesRegistrasiComponent
  }
];

@NgModule({
  declarations: [
    ProsesRegistrasiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProsesRegistrasiModule { }
