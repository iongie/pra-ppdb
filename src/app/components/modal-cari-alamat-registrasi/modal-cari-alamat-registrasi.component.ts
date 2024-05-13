import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { Subject, of, tap, delay, switchMap, map, catchError, takeUntil } from 'rxjs';
import { Lokasi } from '../../interfaces/lokasi.interface';

@Component({
  selector: 'prappdb-modal-cari-alamat-registrasi',
  templateUrl: './modal-cari-alamat-registrasi.component.html',
  styleUrl: './modal-cari-alamat-registrasi.component.css'
})
export class ModalCariAlamatRegistrasiComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  isLoading: boolean = false;
  @Output() view = new EventEmitter<boolean>();
  @Output() lokasi = new EventEmitter<Lokasi>();
  kataKunciCariAlamat: string = '';
  hasilCariAlamat: google.maps.GeocoderResult[]= [];
  hasilCariAlamatError: boolean = false;
  constructor(
    private geocoder: MapGeocoder
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  cariAlamat() {
    of(this.isLoading)
    .pipe(
      tap(()=>this.hasilCariAlamat = []),
      tap(() => this.isLoading = true),
      tap(() => this.hasilCariAlamatError = false),
      delay(5000),
      switchMap(()=> this.geocoder.geocode({ address: this.kataKunciCariAlamat })),
      map((n)=>{
        if(n.results.length === 0){
          throw new Error('harap mengisi form data');
        } else {
          this.hasilCariAlamat = n.results
        }
      }),
      catchError(e => {
        this.isLoading = false;
        this.hasilCariAlamatError = true;
        throw e;
      }),
      tap(() => this.isLoading = false),
      takeUntil(this.destroy)
    )
    .subscribe()
  }

  cancelCariAlamat() {
    this.view.emit(false);
  }

  ambilAlamat(i: number) {
    this.lokasi.emit({lat: this.hasilCariAlamat[i].geometry.location.lat(), lon: this.hasilCariAlamat[i].geometry.location.lng()});
    this.view.emit(false);
  }
}
