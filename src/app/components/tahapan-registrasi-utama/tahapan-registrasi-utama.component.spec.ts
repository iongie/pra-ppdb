import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TahapanRegistrasiUtamaComponent } from './tahapan-registrasi-utama.component';

describe('TahapanRegistrasiUtamaComponent', () => {
  let component: TahapanRegistrasiUtamaComponent;
  let fixture: ComponentFixture<TahapanRegistrasiUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TahapanRegistrasiUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TahapanRegistrasiUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
