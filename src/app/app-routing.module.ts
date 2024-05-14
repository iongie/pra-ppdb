import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerAccessGuard } from './guards/registrasi.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./outlets/utama/utama.module').then(m=> m.UtamaModule)
  },
  {
    path: 'registrasi',
    loadChildren: () => import('./outlets/registrasi/registrasi.module').then(m=> m.RegistrasiModule),
    canActivate:[registerAccessGuard]
  },
  {
    path: 'forbidden',
    loadChildren: () => import('./pages/halaman-403/halaman-403.module').then(m => m.Halaman403Module)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/halaman-404/halaman-404.module').then(m => m.Halaman404Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
