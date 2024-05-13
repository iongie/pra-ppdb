import { TestBed } from '@angular/core/testing';

import { StateProsesRegistrasiService } from './state-proses-registrasi.service';

describe('StateProsesRegistrasiService', () => {
  let service: StateProsesRegistrasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateProsesRegistrasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
