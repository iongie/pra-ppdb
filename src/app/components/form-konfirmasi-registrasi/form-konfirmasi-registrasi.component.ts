import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { StateKonfirmasiRegistrasiService } from '../../services/state-konfirmasi-registrasi/state-konfirmasi-registrasi.service';

@Component({
  selector: 'prappdb-form-konfirmasi-registrasi',
  templateUrl: './form-konfirmasi-registrasi.component.html',
  styleUrl: './form-konfirmasi-registrasi.component.css'
})
export class FormKonfirmasiRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  agree: boolean = false;
  actionMessageError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateKonfirmasi: StateKonfirmasiRegistrasiService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onCheckboxChange(): void {
    this.agree = !this.agree;
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
        item.process = 'done';
      } else if (item.name === 'perpindahan orang tua / wali') {
        item.process = 'on proses';
      } else if (item.name === 'konfirmasi') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/pindah-wali');
    this.router.navigate(['registrasi/pindah-wali']);
  }

  konfirmasi() {
    of(this.agree)
      .pipe(
        tap(() => this.actionMessageError = false),
        tap(() => this.isLoading = true),
        map(n => {
          if (!n) {
            throw new Error('Harap di ceklist');
          }
          return n;
        }),
        tap((r: any) => {
          this.stateKonfirmasi.updateProsesRegister(true)
          this.isLoading = false
        }),
        catchError(e => {
          this.isLoading = false;
          this.actionMessageError = true;
          this.messageError = e.error.message
          throw e;
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
}
