import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, delay, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { AfirmasiData, Jenis, defAfirmasiData, defJenis } from '../../interfaces/afrimasi.interface';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';

@Component({
  selector: 'prappdb-form-afirmasi-registrasi',
  templateUrl: './form-afirmasi-registrasi.component.html',
  styleUrl: './form-afirmasi-registrasi.component.css'
})
export class FormAfirmasiRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;

  jenis: Jenis[] = defJenis;
  jenisError: boolean = false;
  jenisErrorMessage: string = '';


  nameFile: string | null = null;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  
  afirmasiData:AfirmasiData = defAfirmasiData;
  afirmasiForm!: FormGroup;
  afirmasiFormData: FormData | null = null;
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
  ) { }

  ngOnInit(): void {
    this.formAfirmasi();
    this.getJenis();
    this.afirmasi();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  formAfirmasi() {
    this.afirmasiForm = this.fb.group({
      'jns_afirmasi_id': [null, [Validators.required]],
      'no_kartu': [null, [Validators.required]],
      'name_file': [null, [Validators.required]],
      'file': [null]
    });
  }

  afirmasi(){
    this.stateLogin.getLogin
      .pipe(
        switchMap((p)=> this.callApi.getWithParam('siswa/afirmasi', 'siswa_id', parseInt(p.siswa_id!))),
        map((r: any) => r.data),
        tap((r) => this.afirmasiData = r),
        tap(r => {
          if(r.length !== 0){
            this.afirmasiForm.get('jns_afirmasi_id')?.setValue(r.tmjenis_afirmasi_id);
            this.afirmasiForm.get('no_kartu')?.setValue(r.nomor);
            this.afirmasiForm.get('name_file')?.setValue(r.file_name);
            this.afirmasiForm.get('file')?.setValue(r.file_url);
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

  getJenis() {
    of(this.jenisError = false)
      .pipe(
        switchMap(() => this.callApi.get('afirmasi')),
        tap((r: any) => this.jenis = r.data),
        catchError(e => {
          this.jenisError = true;
          this.jenisErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onJenisChange(event: any) {
    const selectedValue = event.target.value;
    this.afirmasiForm.get('jns_afirmasi_id')?.setValue(selectedValue);
  }

  refreshDataGetJenis() {
    this.getJenis();
  }

  get jenisAfirmasiIdControl() {
    return this.afirmasiForm.get('jns_afirmasi_id')!;
  }

  get noJenisAfirmasiId() {
    return this.jenisAfirmasiIdControl.hasError('required') && this.jenisAfirmasiIdControl.touched;
  }

  get nomorKartuControl() {
    return this.afirmasiForm.get('no_kartu')!;
  }

  get noNomorKartu() {
    return this.nomorKartuControl.hasError('required') && this.nomorKartuControl.touched;
  }

  get nameSertifikatControl() {
    return this.afirmasiForm.get('name_file')!;
  }

  get noNameSertifikat() {
    return this.nameSertifikatControl.hasError('required') && this.nameSertifikatControl.touched;
  }

  async uploadFile(event: any) {
    try {
      this.uploadError = false;
      const uploadFile: File = await event.target.files[0]
      await this.afirmasiForm.patchValue({ 'file': uploadFile })
      await this.afirmasiForm.patchValue({ 'name_file': uploadFile.name })
      const formatList = uploadFile.type !== 'image/png' && uploadFile.type !== 'image/jpg' && uploadFile.type !== 'image/jpeg' && uploadFile.type !== 'application/pdf'
      if (formatList) {
        throw new Error('Format File tidak diizinkan')
      }
      this.nameFile = uploadFile.name
    } catch (e:any) {
      this.uploadError = true;
      this.uploadErrorMessage = e.message
    }
  }

  submit() {
    of(this.afirmasiForm.valid)
    .pipe(
      tap(() => this.isLoading = true),
      map(n => {
        if (!n) {
          Object.values(this.afirmasiForm.controls).forEach(control => {
            control.markAsTouched();
          });
          throw new Error('harap mengisi form data');
        }
        return n;
      }),
      switchMap(() => this.stateLogin.getLogin),
      tap((r) => {
        this.afirmasiFormData = new FormData();
        this.afirmasiFormData.append('nik', r.nik!)
        this.afirmasiFormData.append('nisn', r.nisn!)
        this.afirmasiFormData.append('jns_afirmasi_id', this.afirmasiForm.get('jns_afirmasi_id')?.value)
        this.afirmasiFormData.append('no_kartu', this.afirmasiForm.get('no_kartu')?.value)
        this.afirmasiFormData.append('file', this.afirmasiForm.get('file')?.value)
      }),
      switchMap(() => this.callApi.post(this.afirmasiFormData, 'siswa/simpan/afirmasi')),
      tap((r: any) => {
        this.formAfirmasi()
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
            item.process = 'on proses';
          }
        });
        this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/anak-guru')
      }),
      tap(() => this.router.navigate(['registrasi/anak-guru'])),
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
              item.process = 'on proses';
            }
          });
          this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/anak-guru')
          this.router.navigate(['registrasi/anak-guru'])
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
        item.process = 'on proses';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/anak-guru');
    this.router.navigate(['registrasi/anak-guru']);
  }

  kembali() {
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'done';
      } else if (item.name === 'nilai rapor') {
        item.process = 'done';
      } else if (item.name === 'prestasi') {
        item.process = 'on proses';
      } else if (item.name === 'afirmasi / disabilitas') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/prestasi');
    this.router.navigate(['registrasi/prestasi']);
    this.formAfirmasi();
  }
}
