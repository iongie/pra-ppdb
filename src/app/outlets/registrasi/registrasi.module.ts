import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrasiComponent } from './registrasi.component';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrasiComponent,
    children: [
      {
        path: 'data-siswa',
        loadChildren: () => import('../../pages/data-siswa/data-siswa.module').then(m => m.DataSiswaModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'nilai-rapor',
        loadChildren: () => import('../../pages/nilai-rapor/nilai-rapor.module').then(m => m.NilaiRaporModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'prestasi',
        loadChildren: () => import('../../pages/prestasi/prestasi.module').then(m => m.PrestasiModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'tambah-prestasi',
        loadChildren: () => import('../../pages/tambah-prestasi/tambah-prestasi.module').then(m => m.TambahPrestasiModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'afirmasi-disabilitas',
        loadChildren: () => import('../../pages/afirmasi/afirmasi.module').then(m=>m.AfirmasiModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'anak-guru',
        loadChildren: () => import('../../pages/anak-guru/anak-guru.module').then(m=>m.AnakGuruModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'pindah-wali',
        loadChildren: () => import('../../pages/pindah-wali/pindah-wali.module').then(m=>m.PindahWaliModule),
        // canDeactivate: [tahapanGuard]
      },
      {
        path: 'konfirmasi',
        loadChildren: () => import('../../pages/konfirmasi/konfirmasi.module').then(m=>m.KonfirmasiModule)  ,
        // canDeactivate: [tahapanGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    RegistrasiComponent
  ],
  imports: [
    CommonModule,
    ComponentRegistrasiModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrasiModule { }
