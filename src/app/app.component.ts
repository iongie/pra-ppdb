import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateNavigasiService } from './services/state-navigasi/state-navigasi.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

interface CustomWindow extends Window {
  [key: string]: any;
}
interface GoogleMapsConfig {
  v: string;
  key: string;
  [key: string]: string;
}

@Component({
  selector: 'prappdb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  url: string | null = null;
  private destroy: Subject<void> = new Subject<void>;
  h: any;
  a: any;
  k: any;
  p = "The Google Maps JavaScript API";
  c = "google";
  l = "importLibrary";
  q = "__ib__";
  m = document;
  b: CustomWindow = window;
  r = new Set;
  e = new URLSearchParams;
  constructor(
    private router: Router,
    private statenavigasi: StateNavigasiService
  ) {
    this.loadGoogleMaps();
  }

  ngOnInit(): void {
    this.navigation();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private loadGoogleMaps(): void {
    ((g: GoogleMapsConfig) => {
      this.b = this.b[this.c] ?? (this.b[this.c] = {})
      let d = this.b['maps'] ?? (this.b['maps'] = {})
      let u = () => this.h || (this.h = new Promise(async (f, n) => {
        await (this.a = this.m.createElement("script"));
        this.e.set("libraries", [...this.r] + "");
        for (let k in g) {
          if (Object.prototype.hasOwnProperty.call(g, k)) {
            const value = g[k];
            this.e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), value);
          }
        }
        this.e.set("callback", this.c + ".maps." + this.q);
        this.a.src = `https://maps.${this.c}apis.com/maps/api/js?` + this.e;
        d[this.q] = f;
        this.a.onerror = () => this.h = n(Error(this.p + " could not load."));
        const scriptElement = this.m.querySelector("script[nonce]") as HTMLScriptElement | null;
        this.a.nonce = scriptElement?.nonce || "";
        this.m.head.append(this.a)
      }))
      if (d[this.l]) {
        console.warn(this.p + " only loads once. Ignoring:", g)
      } else {
        d[this.l] = (f: any, ...n: any[]) => this.r.add(f) && u().then(() => d[this.l](f, ...n))
      }
    })({
      v: "weekly",
      key: "AIzaSyCKeLcUfs-4psT3ecJGBL1bAX12zUgZ28U"
    });

  }

  navigation(){
    this.router.events
      .pipe(takeUntil(this.destroy))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.statenavigasi.perbaruiUrl(event.url)
        }
      });
  }
}
