import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NilaiRaporComponent } from './nilai-rapor.component';

describe('NilaiRaporComponent', () => {
  let component: NilaiRaporComponent;
  let fixture: ComponentFixture<NilaiRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NilaiRaporComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NilaiRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
