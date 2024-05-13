import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSiswaComponent } from './data-siswa.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';

const routes: Routes = [
  {
    path:'',
    component: DataSiswaComponent
  }
]


@NgModule({
  declarations: [
    DataSiswaComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class DataSiswaModule { }
