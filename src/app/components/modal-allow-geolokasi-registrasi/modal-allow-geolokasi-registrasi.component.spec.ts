import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAllowGeolokasiRegistrasiComponent } from './modal-allow-geolokasi-registrasi.component';

describe('ModalAllowGeolokasiRegistrasiComponent', () => {
  let component: ModalAllowGeolokasiRegistrasiComponent;
  let fixture: ComponentFixture<ModalAllowGeolokasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAllowGeolokasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAllowGeolokasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
