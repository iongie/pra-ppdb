import { Injectable } from '@angular/core';
import { TahapanRegistrasi, defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateTahapanRegistrasiService {
  tahapanRegistrasi = new BehaviorSubject<TahapanRegistrasi[]>(defTahapanRegistrasi);
  halaman = new BehaviorSubject<string | null>(null);
  gettahapanRegistrasi = this.tahapanRegistrasi.asObservable();
  getHalaman = this.halaman.asObservable()
  constructor(
    private cookieStorage: CookieService,
  ) { 
    this.initializecookieStorage();
  }

  private async initializecookieStorage() {
    const storedTahapanRegistrasi = await this.cookieStorage.get('tahapan-registrasi');
    const storedHalaman = await this.cookieStorage.get('halaman-registrasi');
    console.log('storedHalaman', storedHalaman.length);
    
    this.tahapanRegistrasi.next(storedTahapanRegistrasi.length !== 0 ? JSON.parse(storedTahapanRegistrasi): defTahapanRegistrasi);
    this.halaman.next(storedHalaman.length !== 0 ? storedHalaman: null)
  }

  async updateTahapanRegistrasi(newTahapanRegistrasi: TahapanRegistrasi[], newHalaman: string){
    await this.cookieStorage.set('tahapan-registrasi', JSON.stringify(newTahapanRegistrasi), { secure: true, sameSite: 'Lax', });
    await this.cookieStorage.set('halaman-registrasi', newHalaman, { secure: true, sameSite: 'Lax', })
    this.tahapanRegistrasi.next(newTahapanRegistrasi);
  }

  async clearTahapanRegistrasi(){
    await this.cookieStorage.delete('tahapan-registrasi');
    await this.cookieStorage.delete('halaman-registrasi');
    this.tahapanRegistrasi.next(defTahapanRegistrasi);
    this.halaman.next(null);
  }
}
