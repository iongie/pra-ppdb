import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataSiswaRegistrasiComponent } from './form-data-siswa-registrasi.component';

describe('FormDataSiswaRegistrasiComponent', () => {
  let component: FormDataSiswaRegistrasiComponent;
  let fixture: ComponentFixture<FormDataSiswaRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDataSiswaRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDataSiswaRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
