import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponToastComponent } from './respon-toast.component';

describe('ResponToastComponent', () => {
  let component: ResponToastComponent;
  let fixture: ComponentFixture<ResponToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
