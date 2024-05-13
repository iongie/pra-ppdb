import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'prappdb-alur',
  templateUrl: './alur.component.html',
  styleUrl: './alur.component.css'
})
export class AlurComponent implements OnInit {
  urlAlur : string =  'https://docs.google.com/document/d/e/2PACX-1vSYWEAEES199upSyLVRRWVrkg2jnU5Apml1riyu0ViHp4eXXhKwSDnHRV6GcRJ4Zr-vdwcTCNXvrOpX/pub?embedded=true'
  safeDocsAlur: SafeUrl | null = null;
  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.safeDocsAlur = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlAlur)
  }
}
