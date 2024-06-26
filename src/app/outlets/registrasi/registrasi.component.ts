import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateKonfirmasiRegistrasiService } from '../../services/state-konfirmasi-registrasi/state-konfirmasi-registrasi.service';
import { Subject, tap, takeUntil } from 'rxjs';
import { StateGeolokasiService } from '../../services/state-geolokasi/state-geolokasi.service';

@Component({
  selector: 'prappdb-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrl: './registrasi.component.css'
})
export class RegistrasiComponent implements OnInit, OnDestroy {
  view: boolean = false;
  viewKonfirm: boolean = false;
  viewAllow: boolean = true;
  private destroy: Subject<void> = new Subject<void>();
  constructor(
    private stateKonfirmasi: StateKonfirmasiRegistrasiService,
    private stateGeo: StateGeolokasiService
  ){}

  ngOnInit(): void {
   this.konfirmRegister();
   this.successRegister();
   this.allowGeo();
  }

  konfirmRegister(){
    this.stateKonfirmasi.getProsesRegister
    .pipe(
      tap(n=>{
        this.view = n
      }),
      takeUntil(this.destroy)
    )
    .subscribe()
  }

  successRegister(){
    this.stateKonfirmasi.getSuccessRegister
    .pipe(
      tap(n=>{
        this.viewKonfirm = n
      }),
      takeUntil(this.destroy)
    )
    .subscribe()
  }

  allowGeo(){
    this.stateGeo.getAlloeGeoLocation
    .pipe(
      tap(n=>{
        this.viewAllow = n
      }),
      takeUntil(this.destroy)
    )
    .subscribe()
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();  
  }
}
