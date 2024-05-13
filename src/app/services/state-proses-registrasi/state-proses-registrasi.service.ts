import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { ProsesRegistrasi, defProsesRegistrasi } from '../../interfaces/proses-registrasi.interface';

@Injectable({
  providedIn: 'root'
})
export class StateProsesRegistrasiService {
  prosesRegistrasi = new BehaviorSubject<ProsesRegistrasi>(defProsesRegistrasi);
  getProsesRegistrasi = this.prosesRegistrasi.asObservable();
  constructor(
    private cookieStorage: CookieService,
  ) { 
    this.initializecookieStorage();
  }

  private async initializecookieStorage() {
    const storedProsesRegistrasi = await this.cookieStorage.get('hasil-registrasi');
    this.prosesRegistrasi.next(storedProsesRegistrasi.length !== 0 ? JSON.parse(storedProsesRegistrasi): defProsesRegistrasi);
  }

  async updateProsesRegistrasi(newProsesRegistrasi: ProsesRegistrasi){
    await this.cookieStorage.set('hasil-registrasi', JSON.stringify(newProsesRegistrasi), { secure: true, sameSite: 'Lax', });
    this.prosesRegistrasi.next(newProsesRegistrasi);
  }

  async clearProsesRegistrasi(){
    await this.cookieStorage.delete('hasil-registrasi');
    this.prosesRegistrasi.next(defProsesRegistrasi);
  }
}
