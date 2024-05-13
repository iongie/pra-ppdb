import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';

@Component({
  selector: 'prappdb-header-app',
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css'
})
export class HeaderAppComponent implements OnInit, OnDestroy {
  url: string | null = null;
  private destroy: Subject<void> = new Subject<void>;

  constructor(
    private statenavigasi: StateNavigasiService
  ){}

  ngOnInit(): void {
      this.getNavigasi();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getNavigasi(){
    this.statenavigasi.dapatkanUrl
    .pipe(
      tap(n=> this.url = n),
      takeUntil(this.destroy)
    ).subscribe()
  }
}
