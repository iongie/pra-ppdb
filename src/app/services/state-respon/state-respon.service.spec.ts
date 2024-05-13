import { TestBed } from '@angular/core/testing';

import { StateResponService } from './state-respon.service';

describe('StateResponService', () => {
  let service: StateResponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateResponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
