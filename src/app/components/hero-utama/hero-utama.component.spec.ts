import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroUtamaComponent } from './hero-utama.component';

describe('HeroUtamaComponent', () => {
  let component: HeroUtamaComponent;
  let fixture: ComponentFixture<HeroUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
