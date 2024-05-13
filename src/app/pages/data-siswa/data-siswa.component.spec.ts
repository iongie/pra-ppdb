import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSiswaComponent } from './data-siswa.component';

describe('DataSiswaComponent', () => {
  let component: DataSiswaComponent;
  let fixture: ComponentFixture<DataSiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSiswaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
