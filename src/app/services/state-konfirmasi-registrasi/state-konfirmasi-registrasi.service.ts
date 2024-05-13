import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateKonfirmasiRegistrasiService {
  prosesRegister = new BehaviorSubject<boolean>(false) 
  getProsesRegister = this.prosesRegister.asObservable();
  constructor() { }

  updateProsesRegister(newProses: boolean){
    this.prosesRegister.next(newProses)
  }
}
