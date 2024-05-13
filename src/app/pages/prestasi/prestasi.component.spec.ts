import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestasiComponent } from './prestasi.component';

describe('PrestasiComponent', () => {
  let component: PrestasiComponent;
  let fixture: ComponentFixture<PrestasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
