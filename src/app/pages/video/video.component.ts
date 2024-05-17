import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'prappdb-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  verif : string =  'https://drive.google.com/file/d/1dkZTcsroyqtF3Ywn_ZYtm3DktF1H0Swa/preview'
  input : string =  'https://drive.google.com/file/d/1ZWo13_iTNWZUDxc9IRe4cRLDCXuJysLk/preview'
  daftar : string =  'https://drive.google.com/file/d/1RwDna-nfhgj0PjqOrO2rFjLXX8LdtTh3/preview';
  playVideo: string = 'https://drive.google.com/file/d/1dkZTcsroyqtF3Ywn_ZYtm3DktF1H0Swa/preview';
  safeVerif: SafeUrl | null = null;
  safeInput: SafeUrl | null = null;
  safeDaftar: SafeUrl | null = null;
  safePlayVideo: SafeUrl | null = null;
  titlePlayVideo: string = 'Tutorial Input Data Siswa (Operator SD)'
  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.safeVerif = this.sanitizer.bypassSecurityTrustResourceUrl(this.verif);
    this.safeInput = this.sanitizer.bypassSecurityTrustResourceUrl(this.input);
    this.safeDaftar = this.sanitizer.bypassSecurityTrustResourceUrl(this.daftar);
    this.safePlayVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.playVideo);
  }

  gantiPlay(changeSafeUrl: SafeUrl, titlePlayVideo: string){
    this.safePlayVideo = changeSafeUrl;
    this.titlePlayVideo = titlePlayVideo 
  }


}
