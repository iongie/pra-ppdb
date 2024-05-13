import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalUtamaComponent } from './jadwal-utama.component';

describe('JadwalUtamaComponent', () => {
  let component: JadwalUtamaComponent;
  let fixture: ComponentFixture<JadwalUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JadwalUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
