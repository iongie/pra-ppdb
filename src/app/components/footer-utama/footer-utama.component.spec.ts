import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUtamaComponent } from './footer-utama.component';

describe('FooterUtamaComponent', () => {
  let component: FooterUtamaComponent;
  let fixture: ComponentFixture<FooterUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
