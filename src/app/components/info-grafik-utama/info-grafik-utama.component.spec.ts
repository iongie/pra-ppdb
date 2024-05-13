import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGrafikUtamaComponent } from './info-grafik-utama.component';

describe('InfoGrafikUtamaComponent', () => {
  let component: InfoGrafikUtamaComponent;
  let fixture: ComponentFixture<InfoGrafikUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoGrafikUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoGrafikUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
