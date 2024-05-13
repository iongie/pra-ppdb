import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lokasi, defLokasiUntukMap } from '../../interfaces/lokasi.interface';

@Injectable({
  providedIn: 'root'
})
export class StateGeolokasiService {
  latlon = new BehaviorSubject<Lokasi>(defLokasiUntukMap);
  getLatLon = this.latlon.asObservable();
  constructor() {
  }


  async updateLatLon(newLatLon: Lokasi) {
    this.latlon.next(newLatLon);
  }

  async clearLatLon(){
    this.latlon.next(defLokasiUntukMap)
  }

}
