import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponSuccessModalComponent } from './respon-success-modal.component';

describe('ResponSuccessModalComponent', () => {
  let component: ResponSuccessModalComponent;
  let fixture: ComponentFixture<ResponSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponSuccessModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
