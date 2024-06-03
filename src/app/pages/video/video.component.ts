import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'prappdb-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  safeVerif: SafeUrl | null = null;
  safeInput: SafeUrl | null = null;
  safeDaftar: SafeUrl | null = null;
  safePlayVideo: SafeUrl | null = null;
  titlePlayVideo: string = 'Tutorial Input Data Siswa (Operator SD)'
  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.safeVerif = this.sanitizer.bypassSecurityTrustResourceUrl(environment.VERIF);
    this.safeInput = this.sanitizer.bypassSecurityTrustResourceUrl(environment.INPUT);
    this.safeDaftar = this.sanitizer.bypassSecurityTrustResourceUrl(environment.DAFTAR);
    this.safePlayVideo = this.sanitizer.bypassSecurityTrustResourceUrl(environment.VERIF_SMPN);
  }

  gantiPlay(changeSafeUrl: SafeUrl, titlePlayVideo: string){
    this.safePlayVideo = changeSafeUrl;
    this.titlePlayVideo = titlePlayVideo 
  }


}
