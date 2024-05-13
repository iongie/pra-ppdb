import { TestBed } from '@angular/core/testing';

import { StateKonfirmasiRegistrasiService } from './state-konfirmasi-registrasi.service';

describe('StateKonfirmasiRegistrasiService', () => {
  let service: StateKonfirmasiRegistrasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateKonfirmasiRegistrasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
