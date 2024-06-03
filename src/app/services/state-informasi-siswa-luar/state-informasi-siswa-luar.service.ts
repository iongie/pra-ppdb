import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { defLogin } from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class StateInformasiSiswaLuarService {
  info = new BehaviorSubject<Boolean>(true);
  getInfoSiswaLuar = this.info.asObservable();
  constructor(
    private cookieStorage: CookieService,
  ) { 
    this.initializecookieStorage();
  }

  private async initializecookieStorage() {
    const storedLogin = await this.cookieStorage.get('informasi-siswa-luar');
    this.info.next(storedLogin.length !== 0 ? JSON.parse(storedLogin): true);
  }

  async updateInfo(newBool: boolean){
    await this.cookieStorage.set('informasi-siswa-luar', JSON.stringify(newBool), { secure: true, sameSite: 'Lax', });
    this.info.next(newBool);
  }
}
