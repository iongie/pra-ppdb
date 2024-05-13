import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Halaman403Component } from './halaman-403.component';

describe('Halaman403Component', () => {
  let component: Halaman403Component;
  let fixture: ComponentFixture<Halaman403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Halaman403Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Halaman403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
