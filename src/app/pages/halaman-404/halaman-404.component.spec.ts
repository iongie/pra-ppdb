import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Halaman404Component } from './halaman-404.component';

describe('Halaman404Component', () => {
  let component: Halaman404Component;
  let fixture: ComponentFixture<Halaman404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Halaman404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Halaman404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
