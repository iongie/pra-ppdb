import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAfirmasiRegistrasiComponent } from './form-afirmasi-registrasi.component';

describe('FormAfirmasiRegistrasiComponent', () => {
  let component: FormAfirmasiRegistrasiComponent;
  let fixture: ComponentFixture<FormAfirmasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAfirmasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAfirmasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
