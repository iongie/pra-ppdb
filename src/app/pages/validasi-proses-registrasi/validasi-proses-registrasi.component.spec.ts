import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiProsesRegistrasiComponent } from './validasi-proses-registrasi.component';

describe('ValidasiProsesRegistrasiComponent', () => {
  let component: ValidasiProsesRegistrasiComponent;
  let fixture: ComponentFixture<ValidasiProsesRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidasiProsesRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidasiProsesRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
