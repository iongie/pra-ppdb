import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKonfirmasiRegistrasiComponent } from './form-konfirmasi-registrasi.component';

describe('FormKonfirmasiRegistrasiComponent', () => {
  let component: FormKonfirmasiRegistrasiComponent;
  let fixture: ComponentFixture<FormKonfirmasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormKonfirmasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormKonfirmasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
