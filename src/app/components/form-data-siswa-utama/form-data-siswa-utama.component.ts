import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Subject, catchError, map, of, switchMap, takeUntil, tap, timer } from 'rxjs';
import { Sekolah, defSekolah } from '../../interfaces/sekolah.interface';
import { Kabupaten, Kecamatan, Kelurahan, Provinsi, defKabupaten, defKecamatan, defKelurahan, defProvinsi } from '../../interfaces/daerah.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateLoginService } from '../../services/state-login/state-login.service';
import { Router } from '@angular/router';
import { StateTahapanRegistrasiService } from '../../services/state-tahapan-registrasi/state-tahapan-registrasi.service';
import { StateNavigasiService } from '../../services/state-navigasi/state-navigasi.service';
import { ReCaptcha2Component } from 'ngx-captcha';
import { environment } from '../../../environments/environment.development';
import { CallApiService } from '../../services/call-api/call-api.service';
import { HelperService } from '../../services/helper/helper.service';
import { MapGeocoder, MapInfoWindow, MapMarker, MapPolygon } from '@angular/google-maps';
import { Lokasi } from '../../interfaces/lokasi.interface';
import { DataSiswa, defDataSiswa } from '../../interfaces/data-siswa.interface';
import { StateGeolokasiService } from '../../services/state-geolokasi/state-geolokasi.service';
import { StateResponService } from '../../services/state-respon/state-respon.service';
import { defTahapanRegistrasi } from '../../interfaces/tahapan-registrasi.interface';

@Component({
  selector: 'prappdb-form-data-siswa-utama',
  templateUrl: './form-data-siswa-utama.component.html',
  styleUrl: './form-data-siswa-utama.component.css'
})
export class FormDataSiswaUtamaComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();

  sekolah: Sekolah[] = defSekolah;
  sekolahError: boolean = false;
  sekolahErrorMessage: string = '';
  provinsi: Provinsi[] = defProvinsi;
  provinsiError: boolean = false;
  provinsiErrorMessage: string = '';
  kabupaten: Kabupaten[] = defKabupaten;
  kabupatenError: boolean = false;
  kabupatenErrorMessage: string = '';
  kecamatan: Kecamatan[] = defKecamatan;
  kecamatanError: boolean = false;
  kecamatanErrorMessage: string = '';
  kelurahan: Kelurahan[] = defKelurahan;
  kelurahanError: boolean = false;
  kelurahanErrorMessage: string = '';

  dataSiswa: DataSiswa = defDataSiswa;
  dataSiswaForm!: FormGroup;
  dataSiswaFormData: FormData | null = null;
  actionMessageError: boolean = false;
  messageError: string = '';
  isLoading: boolean = false;

  captchaSiteKey = environment.CAPTCHA_SITE_KEY;
  @ViewChild('captchaElem', { static: false }) captchaElem!: ReCaptcha2Component;

  url: string | null = null;

  nameFile: string | null = null;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  geoLokasiError: boolean = false;
  geoLokasiErrorMessage: string = '';
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | null = null;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  location: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  vertices: google.maps.LatLngLiteral[] = [];
  actionMapPolygon: boolean = false;
  optionMapPolygon = {
    strokeColor: 'red',
    strokeWeight: 2,
    fillColor: 'red',
    fillOpacity: 0.2
  }
  minmaxError: boolean = false;
  actionMap: boolean = false;


  isInfoAlamatMap: boolean = true;
  infoAlamatMap: string = '';
  infoLatMap: string = '';
  infoLonMap: string = '';

  isCariAlamat: boolean = false;
  constructor(
    private fb: FormBuilder,
    private stateLogin: StateLoginService,
    private router: Router,
    private stateTahapanegistrasi: StateTahapanRegistrasiService,
    private stateNavigasi: StateNavigasiService,
    private stateGeoLokasi: StateGeolokasiService,
    private stateRespon: StateResponService,
    private callApi: CallApiService,
    private helper: HelperService,
    private geocoder: MapGeocoder
  ) {
  }
  ngOnInit(): void {
    this.formDataSiswa();
    this.getDataSiswa();
    this.getProvinsi();
    this.getSekolah();
    this.getDataPolygonMap();
    this.allowGeo();

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  async allowGeo() {
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
    if (permissionStatus.state === 'granted') {
      this.stateGeoLokasi.updateAllow(false);
      console.log("Geolocation permission granted.");
    } else if (permissionStatus.state === 'prompt') {
      this.stateGeoLokasi.updateAllow(true);
      console.log("Geolocation permission prompt.");
    } else if (permissionStatus.state === 'denied') {
      this.stateGeoLokasi.updateAllow(true);
      console.log("Geolocation permission denied.");
    }

    permissionStatus.onchange = function () {
      console.log("Geolocation permission state has changed to: ", this.state);
    };
  }

  formDataSiswa() {
    this.dataSiswaForm = this.fb.group({
      'alamat': [null, [Validators.required]],
      'provinsi_id': [null, [Validators.required]],
      'kabupaten_id': [{ value: null, disabled: true }, [Validators.required]],
      'kecamatan_id': [{ value: null, disabled: true }, [Validators.required]],
      'kelurahan_id': [{ value: null, disabled: true }, [Validators.required]],
      'rt': [null, [Validators.required]],
      'rw': [null, [Validators.required]],
      'name_file': [null, [Validators.required]],
      'kk': [''],
      'no_kk': [null, [Validators.required]],
      'tanggal_kk': [null, [Validators.required]],
      'no_wa': [null, [Validators.required]],
      'lama_tinggal': [null, [Validators.required]],
      'sekolah_tujuan': [{ value: null, disabled: false }, [Validators.required]],
      'nama_ibu': [null, [Validators.required]],
      'alamat_map': [''],
    })
  }

  get noRtControl() {
    return this.dataSiswaForm.get('rt')!;
  }

  get noRt() {
    return this.noRtControl.hasError('required') && this.noRtControl.touched;
  }

  get noRwControl() {
    return this.dataSiswaForm.get('rw')!;
  }

  get noRw() {
    return this.noRwControl.hasError('required') && this.noRwControl.touched;
  }

  get noKkControl() {
    return this.dataSiswaForm.get('no_kk')!;
  }

  get noNomorKk() {
    return this.noKkControl.hasError('required') && this.noKkControl.touched;
  }

  get tanggalKkControl() {
    return this.dataSiswaForm.get('tanggal_kk')!;
  }

  get noTanggalKk() {
    return this.tanggalKkControl.hasError('required') && this.tanggalKkControl.touched;
  }

  get nomorWaControl() {
    return this.dataSiswaForm.get('no_wa')!;
  }

  get noNomorWa() {
    return this.nomorWaControl.hasError('required') && this.nomorWaControl.touched;
  }

  get lamaTinggalControl() {
    return this.dataSiswaForm.get('lama_tinggal')!;
  }

  get noLamaTinggal() {
    return this.lamaTinggalControl.hasError('required') && this.lamaTinggalControl.touched;
  }

  get sekolahTujuanControl() {
    return this.dataSiswaForm.get('sekolah_tujuan')!;
  }

  get noSekolahTujuan() {
    return this.sekolahTujuanControl.hasError('required') && this.sekolahTujuanControl.touched;
  }

  get provinsiControl() {
    return this.dataSiswaForm.get('provinsi_id')!;
  }

  get noProvinsi() {
    return this.provinsiControl.hasError('required') && this.provinsiControl.touched;
  }

  get kotaControl() {
    return this.dataSiswaForm.get('kabupaten_id')!;
  }

  get noKota() {
    return this.kotaControl.hasError('required') && this.kotaControl.touched;
  }

  get kecamatanControl() {
    return this.dataSiswaForm.get('kecamatan_id')!;
  }

  get noKecamatan() {
    return this.kecamatanControl.hasError('required') && this.kecamatanControl.touched;
  }

  get kelurahanControl() {
    return this.dataSiswaForm.get('kelurahan_id')!;
  }

  get noKelurahan() {
    return this.kelurahanControl.hasError('required') && this.kelurahanControl.touched;
  }

  get alamatControl() {
    return this.dataSiswaForm.get('alamat')!;
  }

  get noAlamat() {
    return this.alamatControl.hasError('required') && this.alamatControl.touched;
  }

  get namaIbuControl() {
    return this.dataSiswaForm.get('nama_ibu')!;
  }

  get noNamaIbu() {
    return this.namaIbuControl.hasError('required') && this.namaIbuControl.touched;
  }

  get nameSertifikatControl() {
    return this.dataSiswaForm.get('name_file')!;
  }

  get noNameSertifikat() {
    return this.nameSertifikatControl.hasError('required') && this.nameSertifikatControl.touched;
  }

  getProvinsi() {
    of(this.provinsiError = false)
      .pipe(
        switchMap(() => this.callApi.get('provinsi')),
        tap((r: any) => this.provinsi = r.data),
        catchError(e => {
          this.provinsiError = true;
          this.provinsiErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onProvinsiChange(event: any) {
    const selectedValue = event.target.value;
    this.dataSiswaForm.get('provinsi_id')?.setValue(selectedValue);
    this.dataSiswaForm.get('kabupaten_id')?.enable();
    this.getKabupaten(event.target.value);
    this.getKecamatan(event.target.value);
    this.getKelurahan(event.target.value);
  }

  refreshDataGetProvinsi() {
    this.getProvinsi();
  }

  getKabupaten(provinsi_id: number) {
    of(this.kabupatenError = false)
      .pipe(
        switchMap(() => this.callApi.getWithParam('kabupaten', 'provinsi_id', provinsi_id)),
        tap((r: any) => this.kabupaten = r.data),
        catchError(e => {
          this.kabupatenError = true;
          this.kabupatenErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onKabupatenChange(event: any) {
    const selectedValue = event.target.value;
    this.dataSiswaForm.get('kabupaten_id')?.setValue(selectedValue);
    this.dataSiswaForm.get('kecamatan_id')?.enable();
    this.getKecamatan(event.target.value);
    this.getKelurahan(event.target.value);
    if (this.kabupaten.length !== 0) {
      const filter_kab = this.kabupaten.filter(r => {
        return r.id === parseInt(selectedValue)
      })
      if (filter_kab[0].kode === '36.74') {
        this.actionMap = true;
      } else {
        this.actionMap = false;
      }
    }
  }

  refreshDataGetKabupaten() {
    this.getKabupaten(this.dataSiswaForm.get('provinsi_id')?.value());
  }

  getKecamatan(kabupaten_id: number) {
    of(this.kecamatanError = false)
      .pipe(
        switchMap(() => this.callApi.getWithParam('kecamatan', 'kabupaten_id', kabupaten_id)),
        tap((r: any) => this.kecamatan = r.data),
        catchError(e => {
          this.kecamatanError = true;
          this.kecamatanErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onKecamatanChange(event: any) {
    const selectedValue = event.target.value;
    this.dataSiswaForm.get('kecamatan_id')?.setValue(selectedValue);
    this.dataSiswaForm.get('kelurahan_id')?.enable();
    this.getKelurahan(event.target.value);
  }

  refreshDataGetKecamatan() {
    this.getKecamatan(this.dataSiswaForm.get('kabupaten_id')?.value());
  }

  getKelurahan(kecamatan_id: number) {
    of(this.kecamatanError = false)
      .pipe(
        switchMap(() => this.callApi.getWithParam('kelurahan', 'kecamatan_id', kecamatan_id)),
        map((r: any) => r.data),
        tap((r: any) => this.kelurahan = r),
        catchError(e => {
          this.kelurahanError = true;
          this.kelurahanErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onKelurahanChange(event: any) {
    const selectedValue = event.target.value;
    this.dataSiswaForm.get('kelurahan_id')?.setValue(selectedValue);
    if (this.kelurahan.length !== 0) {
      const filter_kel = this.kelurahan.filter(r => {
        return r.id === parseInt(selectedValue)
      })
      this.callApi.exGetKoordinat(this.helper.modifKodeWilayah(filter_kel[0].kode!))
        .pipe(
          tap((res: any) => {
            this.markerPositions = [];
            this.vertices = [];
            res.features[0].geometry.coordinates[0].map((coord: any) => {
              this.vertices.push({ lat: parseFloat(coord[1]), lng: parseFloat(coord[0]) })
            })
          }),
          takeUntil(this.destroy)
        ).subscribe()
      console.log(filter_kel, selectedValue, this.kelurahan);

    }

  }

  refreshDataGetKelurahan() {
    this.getKelurahan(this.dataSiswaForm.get('kecamatan_id')?.value());
  }


  getSekolah() {
    of(this.sekolahError = false)
      .pipe(
        switchMap(() => this.callApi.get('sekolah')),
        tap((r: any) => this.sekolah = r.data),

        catchError(e => {
          this.sekolahError = true;
          this.sekolahErrorMessage = e.error.message
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  onSekolahChange(event: any) {
    const selectedValue = event.target.value;
    this.dataSiswaForm.get('tmsekolah_id')?.setValue(selectedValue);
  }

  refreshDataGetSekolah() {
    this.getSekolah();
  }

  async uploadKK(event: any) {
    try {
      const uploadFile: File = await event.target.files[0];
      await this.dataSiswaForm.patchValue({ 'kk': uploadFile })
      await this.dataSiswaForm.patchValue({ 'name_file': uploadFile.name })
      const formatList = uploadFile.type !== 'image/png' && uploadFile.type !== 'image/jpg' && uploadFile.type !== 'image/jpeg'
      if (formatList) {
        throw new Error('Format File tidak diizinkan')
      }
      this.nameFile = uploadFile.name
    } catch (e: any) {
      this.uploadError = false;
      this.uploadErrorMessage = e.message;
    }
  }

  getDataPolygonMap() {
    this.stateLogin.getLogin
      .pipe(
        switchMap((r) => this.callApi.post({ nik: r.nik, nisn: r.nisn }, 'siswa/detail')),
        map((r: any) => r.data),
        switchMap((r) => r.kode !== undefined ? this.callApi.exGetKoordinat(this.helper.modifKodeWilayah(r.kode)) : EMPTY),
        tap((res: any) => {
          res.features[0].geometry.coordinates[0].map((coord: any) => {
            this.vertices.push({ lat: parseFloat(coord[1]), lng: parseFloat(coord[0]) })
          })
        }),
        takeUntil(this.destroy)
      ).subscribe()
  }

  validasiMarker(e: any) {
    let polygami = new google.maps.Polygon({ paths: this.vertices });
    let isInside = google.maps.geometry.poly.containsLocation(e, polygami);
    return isInside
  }

  addMarkerMapPolygonAction(event: google.maps.MapMouseEvent) {
    of(event)
      .pipe(
        tap((e) => {
          this.minmaxError = false;
          this.validasiMarker(e.latLng!.toJSON());
          this.markerPositions = [];
          this.markerPositions.push(e.latLng!.toJSON());
          this.stateGeoLokasi.updateLatLon({ lat: e.latLng!.toJSON().lat, lon: e.latLng!.toJSON().lng })
          this.infoLatMap = e.latLng!.toJSON().lat.toString()
          this.infoLonMap = e.latLng!.toJSON().lng.toString()
        }),
        switchMap((e) => this.geocoder.geocode({ location: { lat: e.latLng!.toJSON().lat, lng: e.latLng!.toJSON().lng } })),
        tap((n) => {
          this.infoAlamatMap = n.results[0].formatted_address
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  addMarkerMapAction(event: google.maps.MapMouseEvent) {
    of(event)
      .pipe(
        tap((e) => {
          let validMarker = this.validasiMarker(e.latLng!.toJSON());
          if (!validMarker) {
            this.minmaxError = true;
          }
        }),
        switchMap(() => timer(2000)),
        tap(() => this.minmaxError = false),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  openInfoMarkerAction(marker: MapMarker) {
    this.infoWindow!.open(marker);
  }

  openCariAlamatAction() {
    this.isCariAlamat = true;
  }

  getLokasi(event: Lokasi) {
    of(event)
      .pipe(
        tap((e) => {
          this.markerPositions = [];
          let validMarker = this.validasiMarker({ lat: e.lat!, lng: e.lon! });
          if (!validMarker) {
            this.minmaxError = true;
          } else {
            this.center = { lat: e.lat!, lng: e.lon! }
            this.markerPositions.push({ lat: e.lat!, lng: e.lon! });
            this.stateGeoLokasi.updateLatLon({ lat: e.lat!, lon: e.lon! })
            this.infoLatMap = e.lat!.toString()
            this.infoLonMap = e.lon!.toString()
          }
        }),
        switchMap((e) => {
          let validMarker = this.validasiMarker({ lat: e.lat!, lng: e.lon! });
          if (!validMarker) {
            this.minmaxError = true;
            return timer(2000)
          } else {
            this.infoLatMap = e.lat!.toString()
            this.infoLonMap = e.lon!.toString()
            return this.geocoder.geocode({ location: { lat: e.lat!, lng: e.lon! } })
          }

        }),
        tap((n) => {
          if (n !== 0) {
            this.infoAlamatMap = n.results[0].formatted_address
          } else {
            this.minmaxError = false
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }

  infoAlamatMapAction() {
    this.isInfoAlamatMap = this.isInfoAlamatMap ? false : true;
  }

  viewModalCariAlamatAction(event: boolean) {
    this.isCariAlamat = event
  }

  getDataSiswa() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.stateLogin.getLogin
            .pipe(
              switchMap((r) => this.callApi.post({ nik: r.nik, nisn: r.nisn }, 'siswa/detail')),
              map((r: any) => r.data),
              tap((r) => this.dataSiswa = r),
              tap(r => {
                r.alamat_detail !== '' && this.dataSiswaForm.get('alamat')?.setValue(r.alamat_detail);
                r.provinsi_id !== '' && this.dataSiswaForm.get('provinsi_id')?.setValue(r.provinsi_id);
                r.provinsi_id !== '' && this.getKabupaten(r.provinsi_id)
                r.kabupaten_id !== '' && this.dataSiswaForm.get('kabupaten_id')?.enable();
                r.kabupaten_id !== '' && this.dataSiswaForm.get('kabupaten_id')?.setValue(r.kabupaten_id);
                r.kabupaten_id !== '' && this.getKecamatan(r.kabupaten_id)
                r.kecamatan_id !== '' && this.dataSiswaForm.get('kecamatan_id')?.setValue(r.kecamatan_id);
                r.kecamatan_id !== '' && this.dataSiswaForm.get('kecamatan_id')?.enable();
                r.kecamatan_id !== '' && this.getKelurahan(r.kecamatan_id)
                r.kelurahan_id !== '' && this.dataSiswaForm.get('kelurahan_id')?.setValue(r.kelurahan_id);
                r.kelurahan_id !== '' && this.dataSiswaForm.get('kelurahan_id')?.enable();
                r.alamat_rt !== '' && this.dataSiswaForm.get('rt')?.setValue(r.alamat_rt);
                r.alamat_rw !== '' && this.dataSiswaForm.get('rw')?.setValue(r.alamat_rw);
                r.file_kk !== '' && this.dataSiswaForm.get('name_file')?.setValue(r.file_kk);
                this.nameFile = r.file_kk === '' ? null : r.file_kk
                r.kk !== '' && this.dataSiswaForm.get('kk')?.setValue(r.kk);
                r.kk !== '' && this.dataSiswaForm.get('no_kk')?.setValue(r.kk);
                r.tgl_terbit_kk !== '' && this.dataSiswaForm.get('tanggal_kk')?.setValue(r.tgl_terbit_kk);
                r.telp !== '' && this.dataSiswaForm.get('no_wa')?.setValue(r.telp);
                r.lama_tinggal !== '' && this.dataSiswaForm.get('lama_tinggal')?.setValue(r.lama_tinggal);
                r.smp_tujuan !== '' && this.dataSiswaForm.get('sekolah_tujuan')?.setValue(r.smp_tujuan);
                r.nama_ibu !== '' && this.dataSiswaForm.get('nama_ibu')?.setValue(r.nama_ibu);
                r.alamat_map !== '' && this.dataSiswaForm.get('alamat_map')?.setValue(r.alamat_map);
              }),
              tap((r) => {
                this.infoLatMap = r.lat === "" ?  position.coords.latitude : r.lat
                this.infoLonMap = r.lat === "" ?  position.coords.longitude : r.long
                this.actionMap = r.lat === "" && r.long === "" ? false : true;
                this.center = r.lat === "" && r.long === "" ? { lat: position.coords.latitude, lng: position.coords.longitude } : { lat: parseFloat(r.lat), lng: parseFloat(r.long) }
                this.markerPositions.push({ lat: this.center.lat, lng: this.center.lng })
                this.stateGeoLokasi.updateLatLon({ lat: this.center.lat, lon: this.center.lng })
              }),
              switchMap((r) => {
                if (r.lat === "" && r.long === "") {
                  return this.geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } })
                } else {
                  return this.geocoder.geocode({ location: { lat: parseFloat(r.lat), lng: parseFloat(r.long) } })
                }
              }),
              tap((n) => {
                this.infoAlamatMap = n.results[0].formatted_address
              }),
              catchError(e => {
                this.messageError = e.error.message;
                throw e;
              }),
              takeUntil(this.destroy)
            ).subscribe()
        }
      )

    } else {
      this.geoLokasiErrorMessage = 'Deteksi Lokasi tidak support di browser ini, harap ganti browser seperti Google chrome, firefox'
    }
  }

  cancel() {
    of(this.getDataSiswa())
      .pipe(
        tap(() => this.router.navigate(['/'])),
        tap(() => this.stateLogin.clearLogin()),
        tap(() => this.stateTahapanegistrasi.clearTahapanRegistrasi()),
        takeUntil(this.destroy)
      ).subscribe()
  }

  submit() {
    of(this.dataSiswaForm.valid)
      .pipe(
        map(n => {
          if (!n) {
            Object.values(this.dataSiswaForm.controls).forEach(control => {
              control.markAsTouched();
            });
            throw new Error('harap mengisi form data');
          }
          return n;
        }),

        switchMap(() => this.stateGeoLokasi.getLatLon),
        tap((r) => {
          this.dataSiswaFormData = new FormData();
          this.dataSiswaFormData.append('file_kk', this.dataSiswaForm.get('kk')?.value)
          this.dataSiswaFormData.append('nik', this.dataSiswa.nik!)
          this.dataSiswaFormData.append('no_kk', this.dataSiswaForm.get('no_kk')?.value)
          this.dataSiswaFormData.append('nama_ibu', this.dataSiswaForm.get('nama_ibu')?.value)
          this.dataSiswaFormData.append('no_telp', this.dataSiswaForm.get('no_wa')?.value)
          this.dataSiswaFormData.append('tanggal_terbit_kk', this.dataSiswaForm.get('tanggal_kk')?.value)
          this.dataSiswaFormData.append('lama_tinggal', this.dataSiswaForm.get('lama_tinggal')?.value)
          this.dataSiswaFormData.append('alamat_detail', this.dataSiswaForm.get('alamat')?.value)
          this.dataSiswaFormData.append('rt', this.helper.padNumber(this.dataSiswaForm.get('rt')?.value, 3))
          this.dataSiswaFormData.append('rw', this.helper.padNumber(this.dataSiswaForm.get('rt')?.value, 3))
          this.dataSiswaFormData.append('provinsi_id', this.dataSiswaForm.get('provinsi_id')?.value)
          this.dataSiswaFormData.append('kabupaten_id', this.dataSiswaForm.get('kabupaten_id')?.value)
          this.dataSiswaFormData.append('kecamatan_id', this.dataSiswaForm.get('kecamatan_id')?.value)
          this.dataSiswaFormData.append('kelurahan_id', this.dataSiswaForm.get('kelurahan_id')?.value)
          this.dataSiswaFormData.append('lat', r.lat!.toString())
          this.dataSiswaFormData.append('long', r.lon!.toString())
          this.dataSiswaFormData.append('alamat_map', this.infoAlamatMap)
          this.dataSiswaFormData.append('smp_tujuan', this.dataSiswaForm.get('sekolah_tujuan')?.value)
          this.dataSiswaFormData.append('nisn', this.dataSiswa.nisn!)
        }),
        switchMap(() => this.callApi.post(this.dataSiswaFormData, 'siswa/simpan/daftar')),
        tap((r: any) => {
          this.stateRespon.updateModelToast({ mode: 'success', pesan: r.message })
          const stepRegistrasi = defTahapanRegistrasi;
          stepRegistrasi.forEach(item => {
            if (item.name === 'data siswa') {
              item.process = 'done';
            } else if (item.name === 'nilai rapor') {
              item.process = 'on proses';
            }
          });
          this.stateTahapanegistrasi.updateTahapanRegistrasi(stepRegistrasi, 'registrasi/nilai-rapor')
          this.router.navigate(['registrasi/nilai-rapor'])
          this.formDataSiswa()
        }),
        catchError((e) => {
          this.isLoading = false;
          this.actionMessageError = true;
          this.messageError = e.message === 'harap mengisi form data' ? e.message : e.error.message;
          throw e;
        }),
        takeUntil(this.destroy)
      )
      .subscribe()
  }
}
