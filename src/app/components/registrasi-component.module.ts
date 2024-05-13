import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDataSiswaUtamaComponent } from './form-data-siswa-utama/form-data-siswa-utama.component';
import { TahapanRegistrasiUtamaComponent } from './tahapan-registrasi-utama/tahapan-registrasi-utama.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { ResponToastComponent } from './respon-toast/respon-toast.component';
import { FormAnakGuruRegistrasiComponent } from './form-anak-guru-registrasi/form-anak-guru-registrasi.component';
import { FormPindahWaliRegistrasiComponent } from './form-pindah-wali-registrasi/form-pindah-wali-registrasi.component';
import { FormAfirmasiRegistrasiComponent } from './form-afirmasi-registrasi/form-afirmasi-registrasi.component';
import { FormPrestasiRegistrasiComponent } from './form-prestasi-registrasi/form-prestasi-registrasi.component';
import { FormDataSiswaRegistrasiComponent } from './form-data-siswa-registrasi/form-data-siswa-registrasi.component';
import { FormKonfirmasiRegistrasiComponent } from './form-konfirmasi-registrasi/form-konfirmasi-registrasi.component';
import { FormTambahPrestasiComponent } from './form-tambah-prestasi/form-tambah-prestasi.component';
import { ModalKonfirmasiRegistrasiComponent } from './modal-konfirmasi-registrasi/modal-konfirmasi-registrasi.component';
import { ModalCariAlamatRegistrasiComponent } from './modal-cari-alamat-registrasi/modal-cari-alamat-registrasi.component';
import { ResponSuccessModalComponent } from './respon-success-modal/respon-success-modal.component';

@NgModule({
  declarations: [
    FormDataSiswaUtamaComponent,
    TahapanRegistrasiUtamaComponent,
    ResponToastComponent,
    FormAnakGuruRegistrasiComponent,
    FormPindahWaliRegistrasiComponent,
    FormAfirmasiRegistrasiComponent,
    FormPrestasiRegistrasiComponent,
    FormDataSiswaRegistrasiComponent,
    FormKonfirmasiRegistrasiComponent,
    FormTambahPrestasiComponent,
    ModalKonfirmasiRegistrasiComponent,
    ModalCariAlamatRegistrasiComponent,
    ResponSuccessModalComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    RouterModule
  ],
  exports:[
    FormDataSiswaUtamaComponent,
    TahapanRegistrasiUtamaComponent,
    ResponToastComponent,
    FormAnakGuruRegistrasiComponent,
    FormPindahWaliRegistrasiComponent,
    FormAfirmasiRegistrasiComponent,
    FormPrestasiRegistrasiComponent,
    FormDataSiswaRegistrasiComponent,
    FormKonfirmasiRegistrasiComponent,
    FormTambahPrestasiComponent,
    ModalKonfirmasiRegistrasiComponent,
    ModalCariAlamatRegistrasiComponent,
    ResponSuccessModalComponent
  ]
})
export class ComponentRegistrasiModule { }
