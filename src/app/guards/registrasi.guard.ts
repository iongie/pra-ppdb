import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { StateLoginService } from "../services/state-login/state-login.service";
import { Login, defLogin } from "../interfaces/login.interface";

export const registerAccessGuard: CanActivateFn = async (route, state) => {
    const access = inject(StateLoginService);
    const routeServ = inject(Router);
    await new Promise(resolve => setTimeout(resolve, 100));
    const login: Login = await firstValueFrom(access.getLogin);
    return login !== defLogin ? true : (routeServ.navigate(['forbidden']), false)
  };