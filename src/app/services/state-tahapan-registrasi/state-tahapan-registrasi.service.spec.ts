import { TestBed } from '@angular/core/testing';

import { StateTahapanRegistrasiService } from './state-tahapan-registrasi.service';

describe('StateTahapanRegistrasiService', () => {
  let service: StateTahapanRegistrasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateTahapanRegistrasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
