import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnakGuruRegistrasiComponent } from './form-anak-guru-registrasi.component';

describe('FormAnakGuruRegistrasiComponent', () => {
  let component: FormAnakGuruRegistrasiComponent;
  let fixture: ComponentFixture<FormAnakGuruRegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAnakGuruRegistrasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAnakGuruRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
