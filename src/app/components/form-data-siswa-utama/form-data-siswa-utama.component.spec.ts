import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataSiswaUtamaComponent } from './form-data-siswa-utama.component';

describe('FormDataSiswaUtamaComponent', () => {
  let component: FormDataSiswaUtamaComponent;
  let fixture: ComponentFixture<FormDataSiswaUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDataSiswaUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDataSiswaUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
