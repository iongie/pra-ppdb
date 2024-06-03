import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformasiSiswaLuarUtamaComponent } from './modal-informasi-siswa-luar-utama.component';

describe('ModalInformasiSiswaLuarUtamaComponent', () => {
  let component: ModalInformasiSiswaLuarUtamaComponent;
  let fixture: ComponentFixture<ModalInformasiSiswaLuarUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalInformasiSiswaLuarUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInformasiSiswaLuarUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
