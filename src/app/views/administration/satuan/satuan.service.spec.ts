import { TestBed } from '@angular/core/testing';

import { SatuanService } from './satuan.service';

describe('SatuanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SatuanService = TestBed.get(SatuanService);
    expect(service).toBeTruthy();
  });
});
