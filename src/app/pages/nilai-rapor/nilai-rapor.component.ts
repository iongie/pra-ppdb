import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CallApiService } from '../../services/call-api/call-api.service';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';
import { NilaiRapor, defNilaiRapor } from '../../interfaces/nilai-rapor.interface';

@Component({
  selector: 'prappdb-nilai-rapor',
  templateUrl: './nilai-rapor.component.html',
  styleUrl: './nilai-rapor.component.css'
})
export class NilaiRaporComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  nilaiRapor: NilaiRapor[] = defNilaiRapor; 
  constructor(
    private callApi: CallApiService,
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateLogin: StateLoginService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getData() {
    this.stateLogin.getLogin
      .pipe(
        switchMap(res => this.callApi.get(`siswa/nilai/${res.siswa_id}`)),
        tap((n:any)=> this.nilaiRapor = n.data),
        takeUntil(this.destroy)
      ).subscribe({
        // next: (res: any) => { 
        //   let newData: any = [];
        //   let temp: any = {};
        //   res.data.forEach((item: any) => {
        //     if (!temp[item.kelas]) {
        //       temp[item.kelas] = {
        //         "tmsiswa_id": item.tmsiswa_id,
        //         "total": item.total,
        //         "kelas": item.kelas,
        //         "data": []
        //       };
        //       newData.push(temp[item.kelas]);
        //     }
        //     temp[item.kelas].data.push({
        //       "tmrapor_id": item.tmrapor_id,
        //       "peringkat": item.peringkat,
        //       "semester": item.semester,
        //       "data_nilai": item.data_nilai
        //     });
        //   });
        //   this.nilaiRapor = newData
        //   console.log(newData);
        // },
        // error: (e) => {

        // }
      })
  }

  kembali(){
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'on proses';
      }else if (item.name === 'nilai rapor') {
        item.process = 'none';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/data-siswa');
    this.router.navigate(['registrasi/data-siswa'])
  }

  lanjut() {
    const stepRegistrasi = defTahapanRegistrasi;
    stepRegistrasi.forEach(item => {
      if (item.name === 'data siswa') {
        item.process = 'done';
      } else if (item.name === 'nilai rapor') {
        item.process = 'done';
      } else if (item.name === 'prestasi') {
        item.process = 'on proses';
      }
    });
    this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/prestasi');
    this.router.navigate(['registrasi/prestasi'])
  }
}
