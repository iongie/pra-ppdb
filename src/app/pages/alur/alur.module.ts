import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlurComponent } from './alur.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: AlurComponent
  }
]


@NgModule({
  declarations: [
    AlurComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AlurModule { }
