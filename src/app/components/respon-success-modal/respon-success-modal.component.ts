import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { Router } from '@angular/router';
import { Subject, tap, takeUntil, timer, switchMap } from 'rxjs';
import { Respon, defRespon } from '../../interfaces/respon.interface';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateKonfirmasiRegistrasiService } from '../../services/state-konfirmasi-registrasi/state-konfirmasi-registrasi.service';

@Component({
  selector: 'prappdb-respon-success-modal',
  templateUrl: './respon-success-modal.component.html',
  styleUrl: './respon-success-modal.component.css'
})
export class ResponSuccessModalComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  respon: Respon = defRespon
  constructor(
    private statePesan: StateResponService,
    private router: Router,
    private stateTahapan: StateTahapanRegistrasiService,
    private stateLogin: StateLoginService,
    private stateKonfirm: StateKonfirmasiRegistrasiService
  ) { }

  ngOnInit(): void {
    this.getRespon()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getRespon() {
    this.statePesan.getModelModal
      .pipe(
        tap((r) => {
          this.respon = r
        }),
        switchMap(() => timer(2000)),
        tap(() => this.statePesan.clearModelModal()),
        tap(() => this.stateLogin.clearLogin()),
        tap(() => this.stateTahapan.clearTahapanRegistrasi()),
        tap(() => this.stateKonfirm.updateSuccessRegister(false)),
        tap(() => this.router.navigate(['/'])),
        takeUntil(this.destroy)
      ).subscribe()
  }

  lanjut() {
    this.router.navigate(['/']);
    this.statePesan.clearModelModal();
    this.stateLogin.clearLogin();
    this.stateTahapan.clearTahapanRegistrasi();
    this.stateKonfirm.updateSuccessRegister(false)
  }
}
