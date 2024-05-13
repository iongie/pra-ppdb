import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsesRegistrasiComponent } from './proses-registrasi.component';

describe('ProsesRegistrasiComponent', () => {
  let component: ProsesRegistrasiComponent;
  let fixture: ComponentFixture<ProsesRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProsesRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsesRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
