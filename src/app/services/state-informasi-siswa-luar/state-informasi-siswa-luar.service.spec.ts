import { TestBed } from '@angular/core/testing';

import { StateInformasiSiswaLuarService } from './state-informasi-siswa-luar.service';

describe('StateInformasiSiswaLuarService', () => {
  let service: StateInformasiSiswaLuarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateInformasiSiswaLuarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
