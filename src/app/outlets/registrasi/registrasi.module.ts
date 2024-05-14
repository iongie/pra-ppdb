import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrasiComponent } from './registrasi.component';
import { ComponentRegistrasiModule } from '../../components/registrasi-component.module';
import { Routes, RouterModule } from '@angular/router';
import { tahapanGuard } from '../../guards/tahapan.guard';

const routes: Routes = [
  {
    path: '',
    component: RegistrasiComponent,
    children: [
      {
        path: 'data-siswa',
        loadChildren: () => import('../../pages/data-siswa/data-siswa.module').then(m => m.DataSiswaModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'nilai-rapor',
        loadChildren: () => import('../../pages/nilai-rapor/nilai-rapor.module').then(m => m.NilaiRaporModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'prestasi',
        loadChildren: () => import('../../pages/prestasi/prestasi.module').then(m => m.PrestasiModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'tambah-prestasi',
        loadChildren: () => import('../../pages/tambah-prestasi/tambah-prestasi.module').then(m => m.TambahPrestasiModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'afirmasi-disabilitas',
        loadChildren: () => import('../../pages/afirmasi/afirmasi.module').then(m=>m.AfirmasiModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'anak-guru',
        loadChildren: () => import('../../pages/anak-guru/anak-guru.module').then(m=>m.AnakGuruModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'pindah-wali',
        loadChildren: () => import('../../pages/pindah-wali/pindah-wali.module').then(m=>m.PindahWaliModule),
        canActivate: [tahapanGuard]
      },
      {
        path: 'konfirmasi',
        loadChildren: () => import('../../pages/konfirmasi/konfirmasi.module').then(m=>m.KonfirmasiModule)  ,
        canActivate: [tahapanGuard]
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
