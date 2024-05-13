import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtamaComponent } from './utama.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentUtamaModule } from '../../components/utama-component.module';

const routes: Routes = [
  {
    path: '',
    component: UtamaComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/beranda/beranda.module').then(m => m.BerandaModule)
      },
      {
        path: 'alur-prappdb',
        loadChildren: () => import('../../pages/alur/alur.module').then(m => m.AlurModule)
      },
      {
        path: 'jadwal-prappdb',
        loadChildren: () => import('../../pages/jadwal/jadwal.module').then(m => m.JadwalModule)
      },
      {
        path: 'video-prappdb',
        loadChildren: () => import('../../pages/video/video.module').then(m => m.VideoModule)
      },
      {
        path: 'validasi-registrasi',
        loadChildren: () => import('../../pages/validasi-registrasi/validasi-registrasi.module').then(m => m.ValidasiRegistrasiModule)
      },
      {
        path: 'validasi-proses-registrasi',
        loadChildren: () => import('../../pages/validasi-proses-registrasi/validasi-proses-registrasi.module').then(m => m.ValidasiProsesRegistrasiModule)
      },
      {
        path: 'proses-registrasi',
        loadChildren: () => import('../../pages/proses-registrasi/proses-registrasi.module').then(m => m.ProsesRegistrasiModule)
      },
    ]
  }
]


@NgModule({
  declarations: [
    UtamaComponent
  ],
  imports: [
    CommonModule,
    ComponentUtamaModule,
    RouterModule.forChild(routes)
  ]
})
export class UtamaModule { }
