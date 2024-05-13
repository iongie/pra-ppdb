import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap, takeUntil, switchMap, timer } from 'rxjs';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { Respon, defRespon } from '../../interfaces/respon.interface';

@Component({
  selector: 'prappdb-respon-toast',
  templateUrl: './respon-toast.component.html',
  styleUrl: './respon-toast.component.css'
})
export class ResponToastComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  respon: Respon = defRespon
  constructor(
    private stateResponS: StateResponService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRespon()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getRespon() {
    this.stateResponS.getModelToast
      .pipe(
        tap((r) => this.respon = r),
        switchMap(() => timer(2000)),
        tap(()=>this.stateResponS.clearRespons()),
        takeUntil(this.destroy)
      ).subscribe()
  }
}
