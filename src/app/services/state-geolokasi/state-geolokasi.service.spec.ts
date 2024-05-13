import { TestBed } from '@angular/core/testing';

import { StateGeolokasiService } from './state-geolokasi.service';

describe('StateGeolokasiService', () => {
  let service: StateGeolokasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateGeolokasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
