import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPindahWaliRegistrasiComponent } from './form-pindah-wali-registrasi.component';

describe('FormPindahWaliRegistrasiComponent', () => {
  let component: FormPindahWaliRegistrasiComponent;
  let fixture: ComponentFixture<FormPindahWaliRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPindahWaliRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPindahWaliRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
