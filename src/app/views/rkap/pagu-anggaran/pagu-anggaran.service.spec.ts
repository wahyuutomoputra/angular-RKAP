import { TestBed } from '@angular/core/testing';

import { PaguAnggaranService } from './pagu-anggaran.service';

describe('PaguAnggaranService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaguAnggaranService = TestBed.get(PaguAnggaranService);
    expect(service).toBeTruthy();
  });
});
