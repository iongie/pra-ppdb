import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrestasiRegistrasiComponent } from './form-prestasi-registrasi.component';

describe('FormPrestasiRegistrasiComponent', () => {
  let component: FormPrestasiRegistrasiComponent;
  let fixture: ComponentFixture<FormPrestasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPrestasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPrestasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
