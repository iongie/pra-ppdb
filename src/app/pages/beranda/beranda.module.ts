import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BerandaComponent } from './beranda.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentUtamaModule } from '../../components/utama-component.module';

const routes: Routes = [
  {
    path: '',
    component: BerandaComponent
  }
];

@NgModule({
  declarations: [
    BerandaComponent
  ],
  imports: [
    CommonModule,
    ComponentUtamaModule,
    RouterModule.forChild(routes)
  ]
})
export class BerandaModule { }
