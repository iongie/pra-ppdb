import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKonfirmasiRegistrasiComponent } from './modal-konfirmasi-registrasi.component';

describe('ModalKonfirmasiRegistrasiComponent', () => {
  let component: ModalKonfirmasiRegistrasiComponent;
  let fixture: ComponentFixture<ModalKonfirmasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalKonfirmasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalKonfirmasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
