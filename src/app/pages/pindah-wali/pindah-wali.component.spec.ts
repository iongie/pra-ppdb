import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PindahWaliComponent } from './pindah-wali.component';

describe('PindahWaliComponent', () => {
  let component: PindahWaliComponent;
  let fixture: ComponentFixture<PindahWaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PindahWaliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PindahWaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
