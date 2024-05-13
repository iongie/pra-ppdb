import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Halaman404Component } from './halaman-404.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: Halaman404Component
  }
]

@NgModule({
  declarations: [
    Halaman404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Halaman404Module { }
