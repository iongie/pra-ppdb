import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Halaman500Component } from './halaman-500.component';

describe('Halaman500Component', () => {
  let component: Halaman500Component;
  let fixture: ComponentFixture<Halaman500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Halaman500Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Halaman500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
