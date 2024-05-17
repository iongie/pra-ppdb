import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, delay, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { Bobot, Kategori, Prestasi, Tingkat, defBobot, defKategori, defPrestasi, defTingkat } from '../../interfaces/prestasi.interface';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';

@Component({
  selector: 'prappdb-form-tambah-prestasi',
  templateUrl: './form-tambah-prestasi.component.html',
  styleUrl: './form-tambah-prestasi.component.css'
})
export class FormTambahPrestasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;

  kategori: Kategori[] = defKategori;
  kategoriError: boolean = false;
  kategoriErrorMessage: string = '';

  tingkat: Tingkat[] = defTingkat;
  tingkatError: boolean = false;
  tingkatErrorMessage: string = '';

  bobot: Bobot[] = defBobot;
  bobotError: boolean = false;
  bobotErrorMessage: string = '';

  nameFile: string | null = null;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  prestasiForm!: FormGroup;
  prestasiFormData: FormData | null = null;
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
  ){}

  ngOnInit(): void {
    this.formPrestasi();
    this.getKategori();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  formPrestasi() {
    this.prestasiForm = this.fb.group({
      'nik': [{ value: null, disabled: true }, [Validators.required]],
      'nisn': [{ value: null, disabled: true }, [Validators.required]],
      'kategori_id': [null, [Validators.required]],
      'tingkat_id': [{ value: null, disabled: true }, [Validators.required]],
      'bobot_id': [{ value: null, disabled: true }, [Validators.required]],
      'nama_prestasi': [null, [Validators.required]],
      'no_sertifikat': [null, [Validators.required]],
      'name_file': [null, [Validators.required]],
      'sertifikat': ['']
    });
  }

  getKategori() {
    of(this.kategoriError = false)
      .pipe(
        switchMap(() => this.callApi.get('kategori_prestasi')),
        tap((r: any) => this.kategori = r.data),
        catchError(e => {
          this.kategoriError = true;
          this.kategoriErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onKategoriChange(event: any) {
    const selectedValue = event.target.value;
    this.prestasiForm.get('kategori_id')?.setValue(selectedValue);
    this.prestasiForm.get('tingkat_id')?.enable();
    this.getTingkat(event.target.value);
  }

  refreshDataGetKategori() {
    this.getKategori();
  }

  getTingkat(kategori_id: number) {
    of(this.tingkatError = false)
      .pipe(
        switchMap(() => this.callApi.getWithParam('tingkat_prestasi', 'kategori', kategori_id)),
        tap((r: any) => this.tingkat = r.data),
        catchError(e => {
          this.tingkatError = true;
          this.tingkatErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onTingkatChange(event: any) {
    const selectedValue = event.target.value;
    this.prestasiForm.get('tingkat_id')?.setValue(selectedValue);
    this.prestasiForm.get('bobot_id')?.enable();
    this.getBobot(event.target.value);
  }

  refreshDataGetTingkat() {
    this.getTingkat(this.prestasiForm.get('kategori_id')?.value());
  }

  getBobot(tingkat_id: number) {
    of(this.bobotError = false)
      .pipe(
        switchMap(() => this.callApi.getWithParam('bobot_prestasi', 'tingkat', tingkat_id)),
        tap((r: any) => this.bobot = r.data),
        catchError(e => {
          this.bobotError = true;
          this.bobotErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onBobotChange(event: any) {
    const selectedValue = event.target.value;
    this.prestasiForm.get('bobot_id')?.setValue(selectedValue);
  }

  refreshDataGetBobot() {
    this.getBobot(this.prestasiForm.get('tingkat_id')?.value());
  }

  get namaPrestasiControl() {
    return this.prestasiForm.get('nama_prestasi')!;
  }

  get noMamaPrestasi() {
    return this.namaPrestasiControl.hasError('required') && this.namaPrestasiControl.touched;
  }

  get bobotControl() {
    return this.prestasiForm.get('bobot_id')!;
  }

  get noBobot() {
    return this.bobotControl.hasError('required') && this.bobotControl.touched;
  }

  get nomorSertifikatControl() {
    return this.prestasiForm.get('no_sertifikat')!;
  }

  get noNomorSertifikat() {
    return this.nomorSertifikatControl.hasError('required') && this.nomorSertifikatControl.touched;
  }

  get namaSertifikatControl() {
    return this.prestasiForm.get('nama_sertifikat')!;
  }

  get noNamaSertifikat() {
    return this.namaSertifikatControl.hasError('required') && this.namaSertifikatControl.touched;
  }

  get kategoriControl() {
    return this.prestasiForm.get('kategori_id')!;
  }

  get noKategori() {
    return this.kategoriControl.hasError('required') && this.kategoriControl.touched;
  }

  get tingkatControl() {
    return this.prestasiForm.get('tingkat_id')!;
  }

  get noTingkat() {
    return this.tingkatControl.hasError('required') && this.tingkatControl.touched;
  }

  get nameSertifikatControl() {
    return this.prestasiForm.get('name_file')!;
  }

  get noNameSertifikat() {
    return this.nameSertifikatControl.hasError('required') && this.nameSertifikatControl.touched;
  }

  async uploadSertifikat(event: any) {
    try {
      this.uploadError = false;
      const uploadFile: File = await event.target.files[0];
      console.log(uploadFile);
      await this.prestasiForm.patchValue({ 'sertifikat': uploadFile });
      await this.prestasiForm.patchValue({ 'name_file': uploadFile.name });
      const formatList = uploadFile.type !== 'image/png' && uploadFile.type !== 'image/jpg' && uploadFile.type !== 'image/jpeg' && uploadFile.type !== 'application/pdf'
      if (formatList){
        throw new Error('Format File tidak diizinkan')
      }
      this.nameFile = uploadFile.name
    } catch (e: any) {
      this.uploadError = true;
      this.uploadErrorMessage = e.message
    }
  }

  cancel(){
    this.router.navigate(['registrasi/prestasi'])
  }

  submit(){
    of(this.prestasiForm.valid)
    .pipe(
      tap(() => this.isLoading = true),
      map(n => {
        if (!n) {
          Object.values(this.prestasiForm.controls).forEach(control => {
            control.markAsTouched();
          });
          throw new Error('harap mengisi form data');
        }
        return n;
      }),
      switchMap(()=>this.stateLogin.getLogin),
      tap((r) => {
        this.prestasiFormData = new FormData();
        this.prestasiFormData.append('nik', r.nik!)
        this.prestasiFormData.append('nisn', r.nisn!)
        this.prestasiFormData.append('bobot_id', this.prestasiForm.get('bobot_id')?.value)
        this.prestasiFormData.append('nama_prestasi', this.prestasiForm.get('nama_prestasi')?.value)
        this.prestasiFormData.append('no_sertifikat', this.prestasiForm.get('no_sertifikat')?.value)
        this.prestasiFormData.append('sertifikat', this.prestasiForm.get('sertifikat')?.value)
      }),
      switchMap(() => this.callApi.post(this.prestasiFormData, 'siswa/simpan/prestasi')),
      tap((r:any) => {
        this.stateRespon.updateModelToast({ mode: 'success', pesan: r.message })
        const stepRegistrasi = defTahapanRegistrasi;
        stepRegistrasi.forEach(item => {
          if (item.name === 'data siswa') {
            item.process = 'done';
          } else if (item.name === 'nilai rapor') {
            item.process = 'done';
          } else if (item.name === 'afirmasi') {
            item.process = 'on proses';
          }
        });
        this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/prestasi');
        this.router.navigate(['registrasi/prestasi'])
      }),
      catchError(e => {
        this.isLoading = false;
        this.actionMessageError = true;
        this.messageError = e.message === 'harap mengisi form data' ? e.message : e.error.message ;
        throw e;
      }),
      tap(() => this.isLoading = false),
      delay(5000),
      takeUntil(this.destroy)
    ).subscribe()
  }
}

