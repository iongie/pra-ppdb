import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterUtamaComponent } from './footer-utama/footer-utama.component';
import { InfoGrafikUtamaComponent } from './info-grafik-utama/info-grafik-utama.component';
import { JadwalUtamaComponent } from './jadwal-utama/jadwal-utama.component';
import { HeroUtamaComponent } from './hero-utama/hero-utama.component';
import { LoginUtamaComponent } from './login-utama/login-utama.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DirectivesModule } from '../directives/directives.module';
import { ModalInformasiSiswaLuarUtamaComponent } from './modal-informasi-siswa-luar-utama/modal-informasi-siswa-luar-utama.component';

@NgModule({
  declarations: [
    FooterUtamaComponent,
    InfoGrafikUtamaComponent,
    JadwalUtamaComponent,
    HeroUtamaComponent,
    LoginUtamaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCaptchaModule, 
    DirectivesModule
  ],
  exports:[
    FooterUtamaComponent,
    InfoGrafikUtamaComponent,
    JadwalUtamaComponent,
    HeroUtamaComponent,
    LoginUtamaComponent
  ]
})
export class ComponentUtamaModule { }
