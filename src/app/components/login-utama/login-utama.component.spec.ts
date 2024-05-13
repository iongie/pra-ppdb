import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUtamaComponent } from './login-utama.component';

describe('LoginUtamaComponent', () => {
  let component: LoginUtamaComponent;
  let fixture: ComponentFixture<LoginUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginUtamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
