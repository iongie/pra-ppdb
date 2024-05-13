import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, takeUntil, switchMap, tap, catchError } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { Prestasi, defPrestasi } from '../../interfaces/prestasi.interface';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';

@Component({
  selector: 'prappdb-prestasi',
  templateUrl: './prestasi.component.html',
  styleUrl: './prestasi.component.css'
})
export class PrestasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  dataPrestasi: Prestasi[] = defPrestasi;
  dataPrestasiError: boolean = false;
  dataPrestasiErrorMessage: string = '';

  urlSimt = 'https://simt.kemdikbud.go.id';
  urlKurasi = 'https://kurasi-pusatprestasinasional.kemdikbud.go.id/';
  constructor(
    private stateLogin: StateLoginService,
    private router: Router,
    private callApi: CallApiService,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.getPrestasi();
    this.sanitizer.bypassSecurityTrustUrl(this.urlSimt);
    this.sanitizer.bypassSecurityTrustUrl(this.urlKurasi)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();  
  }

  getPrestasi(){
    this.stateLogin.getLogin
    .pipe(
      takeUntil(this.destroy),
      tap(()=>this.dataPrestasiError = false),
      switchMap(r=> this.callApi.getWithParam('siswa/prestasi', 'siswa_id', parseInt(r.siswa_id!))),
      tap((r:any)=>this.dataPrestasi = r.data),
      catchError(e => {
        this.dataPrestasiError = true;
        this.dataPrestasiErrorMessage = e.error.message
        throw e;
      }),
    ).subscribe()
  }

  tambahPrestasi(){
    this.router.navigate(['registrasi/tambah-prestasi'])
  }


  kembali(){
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'done';
      } else if (item.name === 'nilai rapor') {
        item.process = 'on proses';
      } else if (item.name === 'prestasi') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/nilai-rapor');
    this.router.navigate(['registrasi/nilai-rapor'])
  }

  lanjut() {
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
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/nilai-rapor');
    this.router.navigate(['registrasi/afirmasi-disabilitas'])
  }
}
