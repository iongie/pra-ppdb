import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'prappdb-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  urlAlur : string =  'https://www.youtube.com/embed/voXlG_U3sVc'
  safeDocsAlur: SafeUrl | null = null;
  constructor(
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.safeDocsAlur = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlAlur)
  }
}
