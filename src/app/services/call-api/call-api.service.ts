import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(
    private http: HttpClient
  ) { }

  post(data: any, page_url: string){
    return this.http.post(environment.URL_API+page_url, data).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  get(page_url?: string){
    return this.http.get(
      environment.URL_API+page_url
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  getWithParam(page_url?: string, param_name?: string, param_value?: number){
    return this.http.get(
      environment.URL_API+page_url,
      {
        params: new HttpParams()
          .set(param_name!, param_value!.toString())
      }
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  getLokasi(page_url?: string, param_name?: string, param_value?: string){
    return this.http.get(
      environment.URL_NOMINATIM+page_url,
      {
        params: new HttpParams()
          .set(param_name!, param_value!)
          .set('format', 'json')
      }
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  getKoordinat(page_url?: string){
    return this.http.get(
      environment.KOORDINATE_MAP_INDONESIA+page_url
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  exGetKoordinat(page_url?: string){
    return this.http.get('../../../assets/kel/'+page_url).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  

  getIp(page_url?: string){
    return this.http.get(
      environment.URL_API_MAIN+page_url
    ).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }
  
}
