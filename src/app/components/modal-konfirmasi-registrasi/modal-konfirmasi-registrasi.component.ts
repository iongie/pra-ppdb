import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateKonfirmasiRegistrasiService } from '../../services/state-konfirmasi-registrasi/state-konfirmasi-registrasi.service';
import { Router } from '@angular/router';
import { Subject, catchError, switchMap, takeUntil, tap } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';

@Component({
  selector: 'prappdb-modal-konfirmasi-registrasi',
  templateUrl: './modal-konfirmasi-registrasi.component.html',
  styleUrl: './modal-konfirmasi-registrasi.component.css'
})
export class ModalKonfirmasiRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>;
  constructor(
    private stateLogin: StateLoginService,
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateNavigasi: StateNavigasiService,
    private callApi: CallApiService,
    private stateRespon: StateResponService,
    private stateKonfirmasi: StateKonfirmasiRegistrasiService
  ){

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  cancel(){
    this.stateKonfirmasi.updateProsesRegister(false)
  }

  submit(){
    this.stateLogin.getLogin
    .pipe(
      switchMap((n)=> this.callApi.post({nik: n.nik, nisn: n.nisn}, 'siswa/simpan/konfirmasi')),
      tap((r: any) => this.stateRespon.updateModelModal({ mode: 'success', pesan: 'r.message' })),
      tap((r)=> this.stateKonfirmasi.updateProsesRegister(false)),
      catchError(e=> {
        this.stateRespon.updateModelToast({ mode: 'error', pesan: e.error.message });
        this.stateKonfirmasi.updateProsesRegister(false);
        if(e.error.message === 'Silahkan tunggu verifikasi operator'){
          this.stateLogin.clearLogin();
          this.stateTahapanegistrasi.clearTahapanRegistrasi();
          this.router.navigate(['/'])
        }
        throw e;
      }),
      takeUntil(this.destroy)
    ).subscribe()
  }
}
