import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPrestasiComponent } from './tambah-prestasi.component';

describe('TambahPrestasiComponent', () => {
  let component: TambahPrestasiComponent;
  let fixture: ComponentFixture<TambahPrestasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TambahPrestasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TambahPrestasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
