import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { Subject, of, tap, map, switchMap, catchError, takeUntil, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { StateProsesRegistrasiService } from '../../services/state-proses-registrasi/state-proses-registrasi.service';

@Component({
  selector: 'prappdb-login-utama',
  templateUrl: './login-utama.component.html',
  styleUrl: './login-utama.component.css'
})
export class LoginUtamaComponent implements OnInit, OnDestroy {
  @Input() title: string | null = null;
  url: string | null = null;
  captchaSiteKey = environment.CAPTCHA_SITE_KEY;
  private destroy: Subject<void> = new Subject<void>();
  @ViewChild('captchaElem', { static: false }) captchaElem!: ReCaptcha2Component;
  loginPrappdbForm!: FormGroup;
  loginPraPpdbFormData: FormData | null = null;
  actionMessageError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private callApi: CallApiService,
    private stateLogin: StateLoginService,
    private stateTahapanRegistrasi: StateTahapanRegistrasiService,
    private stateProsesRegistrasi: StateProsesRegistrasiService,
    private stateNavigasi: StateNavigasiService
  ) { }

  ngOnInit(): void {
    this.formLogin();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  formLogin() {
    this.stateNavigasi.dapatkanUrl
      .pipe(
        tap((n) => {
          this.loginPrappdbForm = this.fb.group({
            nik: [null, [Validators.required]],
            'g-recaptcha-response': ['', [Validators.required]]
          });
          this.url = n
          console.log(this.url);
        }),
        takeUntil(this.destroy)
      ).subscribe()
  }

  get nikControl() {
    return this.loginPrappdbForm.get('nik')!;
  }

  get noNik() {
    return this.nikControl.hasError('required') && this.nikControl.touched;
  }

  get recaptchaControl() {
    return this.loginPrappdbForm.get('g-recaptcha-response')!;
  }

  get noRecaptcha() {
    return this.recaptchaControl.hasError('required') && this.recaptchaControl.touched;
  }

  recaptchaSuccess(ev: string) {
    this.loginPrappdbForm.patchValue({ recaptcha: ev })
  }

  cancel() {
    this.formLogin();
    this.router.navigate(['/']);
  }

  submit() {
    of(this.loginPrappdbForm.valid)
      .pipe(
        tap(() => this.isLoading = true),
        map(n => {
          if (!n) {
            Object.values(this.loginPrappdbForm.controls).forEach(control => {
              control.markAsTouched();
            });
            throw new Error('harap mengisi form data');
          }
          return n;
        }),
        switchMap(() => {
          if (this.url === '/validasi-registrasi') {
            return this.callApi.post(this.loginPrappdbForm.value, 'siswa/daftar/validate')
          } else if (this.url == '/validasi-proses-registrasi') {
            return this.callApi.post(this.loginPrappdbForm.value, 'siswa/check/registrasi')
          } else {
            return EMPTY
          }

        }),
        tap((n: any) => {
          this.isLoading = false;
          this.formLogin();
          if (this.url === '/validasi-registrasi') {
            this.stateLogin.updateLogin(n.data);
            const tahapanRegistrasi = defTahapanRegistrasi;
            tahapanRegistrasi.forEach(item => {
              if (item.name === 'data siswa') {
                item.process = 'on proses';
              }
            });
            this.stateTahapanRegistrasi.updateTahapanRegistrasi(tahapanRegistrasi, 'registrasi/data-siswa');
            this.router.navigate(['registrasi/data-siswa']);
          } else if (this.url == '/validasi-proses-registrasi') {
            this.stateProsesRegistrasi.updateProsesRegistrasi(n.data);
            this.router.navigate(['proses-registrasi']);
          } else {
            EMPTY
          }

        }),
        catchError(e => {
          this.isLoading = false;
          this.actionMessageError = true;
          this.messageError = e.message === 'harap mengisi form data' ? e.message : e.error.message;
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }
}
