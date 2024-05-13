import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTambahPrestasiComponent } from './form-tambah-prestasi.component';

describe('FormTambahPrestasiComponent', () => {
  let component: FormTambahPrestasiComponent;
  let fixture: ComponentFixture<FormTambahPrestasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTambahPrestasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTambahPrestasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
