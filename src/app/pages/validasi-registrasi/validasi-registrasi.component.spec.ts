import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiRegistrasiComponent } from './validasi-registrasi.component';

describe('ValidasiRegistrasiComponent', () => {
  let component: ValidasiRegistrasiComponent;
  let fixture: ComponentFixture<ValidasiRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidasiRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidasiRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
