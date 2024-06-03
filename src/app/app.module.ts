import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderAppComponent } from './components/header-app/header-app.component';
import { environment } from '../environments/environment';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { ModalInformasiSiswaLuarUtamaComponent } from './components/modal-informasi-siswa-luar-utama/modal-informasi-siswa-luar-utama.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
    ModalInformasiSiswaLuarUtamaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxGoogleAnalyticsModule.forRoot(environment.GA),
    NgxGoogleAnalyticsRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
