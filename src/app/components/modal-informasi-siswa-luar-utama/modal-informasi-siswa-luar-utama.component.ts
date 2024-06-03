import { Component} from '@angular/core';
import { StateInformasiSiswaLuarService } from '../../services/state-informasi-siswa-luar/state-informasi-siswa-luar.service';

@Component({
  selector: 'prappdb-modal-informasi-siswa-luar-utama',
  templateUrl: './modal-informasi-siswa-luar-utama.component.html',
  styleUrl: './modal-informasi-siswa-luar-utama.component.css'
})
export class ModalInformasiSiswaLuarUtamaComponent {
  view!: boolean;
  constructor(
    private stateInfo: StateInformasiSiswaLuarService
  ){

  }
  actionModal(){
    this.stateInfo.updateInfo(false)
  }
}
