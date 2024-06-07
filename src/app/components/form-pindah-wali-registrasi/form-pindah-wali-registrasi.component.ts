import { Component, OnDestroy, OnInit } from '@angular/core';
import { PindahWali, defPindahWali } from '../../interfaces/pindah-wali.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, delay, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';

@Component({
  selector: 'prappdb-form-pindah-wali-registrasi',
  templateUrl: './form-pindah-wali-registrasi.component.html',
  styleUrl: './form-pindah-wali-registrasi.component.css'
})
export class FormPindahWaliRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;

  nameFile: string | null = null;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  pindahWaliData: PindahWali = defPindahWali;
  pindahWaliForm!: FormGroup;
  pindahWaliFormData: FormData | null = null;
  actionMessageError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;
  isHapusLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private stateLogin: StateLoginService,
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateNavigasi: StateNavigasiService,
    private callApi: CallApiService,
    private stateRespon: StateResponService
  ) {

  }

  ngOnInit(): void {
    this.formPindahWali();
    this.pindahWali();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  formPindahWali() {
    this.pindahWaliForm = this.fb.group({
      'no_surat': [null, [Validators.required]],
      'instansi_ortu': [null, [Validators.required]],
      'name_file': [null, [Validators.required]],
      'file': [null]
    });
  }

  pindahWali() {
    this.stateLogin.getLogin
      .pipe(
        switchMap((p) => this.callApi.getWithParam('siswa/pindah_ortu', 'siswa_id', parseInt(p.siswa_id!))),
        map((r: any) => r.data),
        tap((r) => this.pindahWali = r),
        tap(r => {
          if (r.length !== 0) {
            this.pindahWaliForm.get('no_surat')?.setValue(r.no_sk);
            this.pindahWaliForm.get('instansi_ortu')?.setValue(r.instansi_ortu);
            this.pindahWaliForm.get('name_file')?.setValue(r.file_name);
            this.pindahWaliForm.get('file')?.setValue(r.file_url);
            this.nameFile = r.file_name === '' ? null : r.file_name
          }
        }),
        catchError(e => {
          this.actionMessageError = true;
          this.messageError = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  get nomorSuratControl() {
    return this.pindahWaliForm.get('no_surat')!;
  }

  get noNomorSUrat() {
    return this.nomorSuratControl.hasError('required') && this.nomorSuratControl.touched;
  }

  get instansiOrtuControl() {
    return this.pindahWaliForm.get('instansi_ortu')!;
  }

  get noInstansiOrtu() {
    return this.instansiOrtuControl.hasError('required') && this.instansiOrtuControl.touched;
  }

  get nameSuratControl() {
    return this.pindahWaliForm.get('name_file')!;
  }

  get noNameSurat() {
    return this.nameSuratControl.hasError('required') && this.nameSuratControl.touched;
  }

  get nameSertifikatControl() {
    return this.pindahWaliForm.get('name_file')!;
  }

  get noNameSertifikat() {
    return this.nameSertifikatControl.hasError('required') && this.nameSertifikatControl.touched;
  }

  async onInstansiOrtu(event: any) {
    await this.pindahWaliForm.get('instansi_ortu')?.setValue(event.target.value);
  }

  async uploadFile(event: any) {
    try {
      this.uploadError = false;
      const uploadFile: File = await event.target.files[0]
      await this.pindahWaliForm.patchValue({ 'file': uploadFile })
      await this.pindahWaliForm.patchValue({ 'name_file': uploadFile.name })
      const formatList = uploadFile.type !== 'image/png' && uploadFile.type !== 'image/jpg' && uploadFile.type !== 'image/jpeg' && uploadFile.type !== 'application/pdf'
      if (formatList) {
        throw new Error('Format File tidak diizinkan')
      }
      this.nameFile = uploadFile.name
    } catch (e: any) {
      this.uploadError = true;
      this.uploadErrorMessage = e.message

    }
  }

  submit() {
    of(this.pindahWaliForm.valid)
      .pipe(
        tap(() => this.isLoading = true),
        map(n => {
          if (!n) {
            Object.values(this.pindahWaliForm.controls).forEach(control => {
              control.markAsTouched();
            });
            throw new Error('harap mengisi form data');
          }
          return n;
        }),
        switchMap(() => this.stateLogin.getLogin),
        tap((r) => {
          this.pindahWaliFormData = new FormData();
          this.pindahWaliFormData.append('nik', r.nik!)
          this.pindahWaliFormData.append('nisn', r.nisn!)
          this.pindahWaliFormData.append('instansi_ortu', this.pindahWaliForm.get('instansi_ortu')?.value)
          this.pindahWaliFormData.append('no_surat', this.pindahWaliForm.get('no_surat')?.value)
          this.pindahWaliFormData.append('file', this.pindahWaliForm.get('file')?.value)
        }),
        switchMap(() => this.callApi.post(this.pindahWaliFormData, 'siswa/simpan/pindah_ortu')),
        tap((r: any) => {
          this.formPindahWali()
          this.stateRespon.updateModelToast({ mode: 'success', pesan: r.message })
          const stepRegistrasi = defTahapanRegistrasi;
          stepRegistrasi.forEach(item => {
            if (item.name === 'data siswa') {
              item.process = 'done';
            } else if (item.name === 'nilai rapor') {
              item.process = 'done';
            } else if (item.name === 'prestasi') {
              item.process = 'done';
            } else if (item.name === 'afirmasi / disabilitas') {
              item.process = 'done';
            } else if (item.name === 'anak guru') {
              item.process = 'done';
            } else if (item.name === 'perpindahan orang tua / wali') {
              item.process = 'done';
            } else if (item.name === 'konfirmasi') {
              item.process = 'on proses';
            }
          });
          this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/konfirmasi')
        }),
        tap(() => this.router.navigate(['registrasi/konfirmasi'])),
        catchError(e => {
          this.isLoading = false;
          this.stateRespon.updateModelToast({ mode: 'error', pesan: e.error.message });
          if (e.error.message === 'Data sudah tersedia.') {
            const stepRegistrasi = defTahapanRegistrasi;
            stepRegistrasi.forEach(item => {
              if (item.name === 'data siswa') {
                item.process = 'done';
              } else if (item.name === 'nilai rapor') {
                item.process = 'done';
              } else if (item.name === 'prestasi') {
                item.process = 'done';
              } else if (item.name === 'afirmasi / disabilitas') {
                item.process = 'done';
              } else if (item.name === 'anak guru') {
                item.process = 'done';
              } else if (item.name === 'perpindahan orang tua / wali') {
                item.process = 'done';
              } else if (item.name === 'konfirmasi') {
                item.process = 'on proses';
              }
            });
            this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/konfirmasi');
            this.router.navigate(['registrasi/konfirmasi'])
          }

          throw e;
        }),
        tap(() => this.isLoading = false),
        delay(5000),
        takeUntil(this.destroy)
      ).subscribe()
  }

  lewati() {
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'done';
      } else if (item.name === 'nilai rapor') {
        item.process = 'done';
      } else if (item.name === 'prestasi') {
        item.process = 'done';
      } else if (item.name === 'afirmasi / disabilitas') {
        item.process = 'done';
      } else if (item.name === 'anak guru') {
        item.process = 'done';
      } else if (item.name === 'perpindahan orang tua / wali') {
        item.process = 'done';
      } else if (item.name === 'konfirmasi') {
        item.process = 'on proses';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/konfirmasi');
    this.router.navigate(['registrasi/konfirmasi']);
  }

  kembali() {
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'done';
      } else if (item.name === 'nilai rapor') {
        item.process = 'done';
      } else if (item.name === 'prestasi') {
        item.process = 'done';
      } else if (item.name === 'afirmasi / disabilitas') {
        item.process = 'done';
      } else if (item.name === 'anak guru') {
        item.process = 'on proses';
      } else if (item.name === 'perpindahan orang tua / wali') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/anak-guru');
    this.router.navigate(['registrasi/anak-guru']);
  }

  hapus() {
    this.stateLogin.getLogin
      .pipe(
        tap(() => this.isHapusLoading = true),
        switchMap((r) => this.callApi.delete('siswa/delete/pindah_ortu', r.nik!, r.nisn!)),
        tap((r: any) => {
          this.formPindahWali()
          this.stateRespon.updateModelToast({ mode: 'success', pesan: r.message })
          this.nameFile = null;
        }),
        catchError(e => {
          this.isHapusLoading = false;
          this.stateRespon.updateModelToast({ mode: 'error', pesan: e.error.message });
          throw e;
        }),
        tap(() => this.isHapusLoading = false),
        delay(5000),
        takeUntil(this.destroy)
      )
      .subscribe()
  }
}
