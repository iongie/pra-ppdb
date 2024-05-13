import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnakGuru, defAnakGuru } from '../../interfaces/anak-guru.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, catchError, delay, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';

@Component({
  selector: 'prappdb-form-anak-guru-registrasi',
  templateUrl: './form-anak-guru-registrasi.component.html',
  styleUrl: './form-anak-guru-registrasi.component.css'
})
export class FormAnakGuruRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;

  nameFile: string | null = null;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';


  anakGuruData:AnakGuru = defAnakGuru;
  anakGuruForm!: FormGroup;
  anakGuruFormData: FormData | null = null;
  actionMessageError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private stateLogin: StateLoginService,
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateNavigasi: StateNavigasiService,
    private callApi: CallApiService,
    private stateRespon: StateResponService
  ){

  }

  ngOnInit(): void {
    this.formAnakGuru();
    this.anakGuru();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  formAnakGuru(){
    this.anakGuruForm = this.fb.group({
      'no_surat': [null, [Validators.required]],
      'name_file': [null, [Validators.required]],
      'file': [null]
    });
  }

  anakGuru(){
    this.stateLogin.getLogin
    .pipe(
      switchMap((p) => this.callApi.getWithParam('siswa/anak_guru', 'siswa_id', parseInt(p.siswa_id!))),
      map((r: any) => r.data),
      tap((r) => this.anakGuruData = r),
      tap(r => {
        this.anakGuruForm.get('no_surat')?.setValue(r.no_sk);
        this.anakGuruForm.get('name_file')?.setValue(r.file_name);
        this.anakGuruForm.get('file')?.setValue(r.file_url);
        this.nameFile = r.file_name === '' ? null : r.file_name
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
    return this.anakGuruForm.get('no_surat')!;
  }

  get noNomorSUrat() {
    return this.nomorSuratControl.hasError('required') && this.nomorSuratControl.touched;
  }

  get nameSuratControl() {
    return this.anakGuruForm.get('name_file')!;
  }

  get noNameSurat() {
    return this.nameSuratControl.hasError('required') && this.nameSuratControl.touched;
  }

  get nameSertifikatControl() {
    return this.anakGuruForm.get('name_file')!;
  }

  get noNameSertifikat() {
    return this.nameSertifikatControl.hasError('required') && this.nameSertifikatControl.touched;
  }

  async uploadFile(event: any) {
    try {
      const uploadFile: File = await event.target.files[0]
      await this.anakGuruForm.patchValue({ 'file': uploadFile })
      await this.anakGuruForm.patchValue({ 'name_file': uploadFile.name })
      const formatList = uploadFile.type !== 'image/png' && uploadFile.type !== 'image/jpg' && uploadFile.type !== 'image/jpeg' && uploadFile.type !== 'application/pdf'
      if (formatList) {
        throw new Error('Format File tidak diizinkan')
      }
      this.nameFile = uploadFile.name
    } catch (e: any) {
      this.uploadError = false;
      this.uploadErrorMessage = e.message
    }
  }

  submit(){
    of(this.anakGuruForm.valid)
      .pipe(
        tap(() => this.isLoading = true),
        map(n => {
          if (!n) {
            Object.values(this.anakGuruForm.controls).forEach(control => {
              control.markAsTouched();
            });
            throw new Error('harap mengisi form data');
          }
          return n;
        }),
        switchMap(() => this.stateLogin.getLogin),
        tap((r) => {
          this.anakGuruFormData = new FormData();
          this.anakGuruFormData.append('nik', r.nik!)
          this.anakGuruFormData.append('nisn', r.nisn!)
          this.anakGuruFormData.append('no_surat', this.anakGuruForm.get('no_surat')?.value)
          this.anakGuruFormData.append('file', this.anakGuruForm.get('file')?.value)
        }),
        switchMap(() => this.callApi.post(this.anakGuruFormData, 'siswa/simpan/anak_guru')),
        tap((r:any) => {
          this.formAnakGuru()
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
              item.process = 'on proses';
            }
          });
          this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/pindah-wali')
        }),
        tap(() => this.router.navigate(['registrasi/pindah-wali'])),
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
                item.process = 'on proses';
              }
            });
            this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/pindah-wali');
            this.router.navigate(['registrasi/pindah-wali']);
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
        item.process = 'on proses';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/pindah-wali');
    this.router.navigate(['registrasi/pindah-wali']);
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
        item.process = 'on proses';
      } else if (item.name === 'anak guru') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/afirmasi-disabilitas');
    this.router.navigate(['registrasi/afirmasi-disabilitas'])
  }
}
