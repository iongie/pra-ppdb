import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NilaiRaporComponent } from './nilai-rapor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NilaiRaporComponent
  }
];

@NgModule({
  declarations: [
    NilaiRaporComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NilaiRaporModule { }
