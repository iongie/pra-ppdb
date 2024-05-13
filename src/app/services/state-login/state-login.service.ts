import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Login, defLogin } from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class StateLoginService {
  login = new BehaviorSubject<Login>(defLogin);
  getLogin = this.login.asObservable();
  constructor(
    private cookieStorage: CookieService,
  ) { 
    this.initializecookieStorage();
  }

  private async initializecookieStorage() {
    const storedLogin = await this.cookieStorage.get('daftar-ppdb');
    this.login.next(storedLogin.length !== 0 ? JSON.parse(storedLogin): defLogin);
  }

  async updateLogin(newLogin: Login){
    await this.cookieStorage.set('daftar-ppdb', JSON.stringify(newLogin), { secure: true, sameSite: 'Lax', });
    this.login.next(newLogin);
  }

  async clearLogin(){
    await this.cookieStorage.delete('daftar-ppdb');
    this.login.next(defLogin);
  }
}
