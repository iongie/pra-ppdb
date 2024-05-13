import { Component, OnDestroy, OnInit } from '@angular/core';
import { TahapanRegistrasi, defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'prappdb-tahapan-registrasi-utama',
  templateUrl: './tahapan-registrasi-utama.component.html',
  styleUrl: './tahapan-registrasi-utama.component.css'
})
export class TahapanRegistrasiUtamaComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  step: TahapanRegistrasi[] = defTahapanRegistrasi
  constructor(
    private stateTahapanRegistrasi: StateTahapanRegistrasiService
  ){
    
  }

  ngOnInit(): void {
    this.stateTahapanRegistrasi.gettahapanRegistrasi
    .pipe(
      tap(r=> this.step = r),
      takeUntil(this.destroy)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete()  
  }
}
