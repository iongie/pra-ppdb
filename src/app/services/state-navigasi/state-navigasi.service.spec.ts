import { TestBed } from '@angular/core/testing';

import { StateNavigasiService } from './state-navigasi.service';

describe('StateNavigasiService', () => {
  let service: StateNavigasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateNavigasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
