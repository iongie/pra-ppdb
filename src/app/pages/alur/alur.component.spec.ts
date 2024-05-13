import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlurComponent } from './alur.component';

describe('AlurComponent', () => {
  let component: AlurComponent;
  let fixture: ComponentFixture<AlurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
