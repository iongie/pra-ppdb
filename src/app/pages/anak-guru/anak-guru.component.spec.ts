import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnakGuruComponent } from './anak-guru.component';

describe('AnakGuruComponent', () => {
  let component: AnakGuruComponent;
  let fixture: ComponentFixture<AnakGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnakGuruComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnakGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
