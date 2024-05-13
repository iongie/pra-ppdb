import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Halaman500Component } from './halaman-500.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: Halaman500Component
  }
]

@NgModule({
  declarations: [
    Halaman500Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Halaman500Module { }
