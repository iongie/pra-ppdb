import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfirmasiComponent } from './afirmasi.component';

describe('AfirmasiComponent', () => {
  let component: AfirmasiComponent;
  let fixture: ComponentFixture<AfirmasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfirmasiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfirmasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
