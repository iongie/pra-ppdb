import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCariAlamatRegistrasiComponent } from './modal-cari-alamat-registrasi.component';

describe('ModalCariAlamatRegistrasiComponent', () => {
  let component: ModalCariAlamatRegistrasiComponent;
  let fixture: ComponentFixture<ModalCariAlamatRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCariAlamatRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCariAlamatRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
