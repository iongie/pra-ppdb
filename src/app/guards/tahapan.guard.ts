import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { delay, firstValueFrom, take } from "rxjs";
import { StateTahapanRegistrasiService } from "../services/state-tahapan-registrasi/state-tahapan-registrasi.service";
import { CookieService } from "ngx-cookie-service";

export const tahapanGuard: CanActivateFn = async (route, state) => {
    const tahapan = inject(StateTahapanRegistrasiService);
    const cookie = inject(CookieService)
    const router = inject(Router);
    const getTahapan = await cookie.get('halaman-registrasi');
    // console.log(getTahapan, state, route.url[0].path, state.url === '/'+getTahapan);
    if(state.url === '/'+getTahapan){
      return true
    } else if (state.url === '/registrasi/tambah-prestasi' && getTahapan === 'registrasi/prestasi'){
      return true
    } else {
      router.navigate([getTahapan!])
      return false
    }
  };