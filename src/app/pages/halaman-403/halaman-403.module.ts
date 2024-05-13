import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Halaman403Component } from './halaman-403.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: Halaman403Component
  }
]

@NgModule({
  declarations: [
    Halaman403Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Halaman403Module { }
