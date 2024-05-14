import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateKonfirmasiRegistrasiService {
  prosesRegister = new BehaviorSubject<boolean>(false) 
  getProsesRegister = this.prosesRegister.asObservable();
  successRegister = new BehaviorSubject<boolean>(false);
  getSuccessRegister = this.successRegister.asObservable();
  constructor() { }

  updateProsesRegister(newProses: boolean){
    this.prosesRegister.next(newProses)
  }

  updateSuccessRegister(newSuccess: boolean){
    this.successRegister.next(newSuccess)
  }
}
