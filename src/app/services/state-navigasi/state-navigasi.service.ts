import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateNavigasiService {
  url = new BehaviorSubject<string>('');
  dapatkanUrl = this.url.asObservable();
  constructor() { }

  async perbaruiUrl(urlBaru: string) {
    this.url.next(urlBaru)
  }
}
