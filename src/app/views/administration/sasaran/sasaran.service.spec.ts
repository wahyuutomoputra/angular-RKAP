import { TestBed } from '@angular/core/testing';

import { SasaranService } from './sasaran.service';

describe('SasaranService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SasaranService = TestBed.get(SasaranService);
    expect(service).toBeTruthy();
  });
});
