import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { ProsesRegistrasi, defProsesRegistrasi } from '../../interfaces/proses-registrasi.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { StateProsesRegistrasiService } from '../../services/state-proses-registrasi/state-proses-registrasi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'prappdb-proses-registrasi',
  templateUrl: './proses-registrasi.component.html',
  styleUrl: './proses-registrasi.component.css'
})
export class ProsesRegistrasiComponent implements OnInit, OnDestroy {
  hasilRegistrasi: ProsesRegistrasi = defProsesRegistrasi;
  private destroy: Subject<void> = new Subject<void>();
  formEditData: boolean = false;
  constructor(
    private stateProsesRegistrasi: StateProsesRegistrasiService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getHasilRegistrasi();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getHasilRegistrasi(){
    this.stateProsesRegistrasi.getProsesRegistrasi
    .pipe(
      tap((res)=>{
        this.hasilRegistrasi = res;
      }),
      takeUntil(this.destroy)
    )
    .subscribe()
  }

  copyPin(){
  }

  perbaikiData(){
    this.stateProsesRegistrasi.clearProsesRegistrasi()
    this.router.navigate(['validasi-registrasi'])
  }
}
