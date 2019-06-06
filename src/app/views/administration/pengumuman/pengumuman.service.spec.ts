import { TestBed } from '@angular/core/testing';

import { PengumumanService } from './pengumuman.service';

describe('PengumumanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PengumumanService = TestBed.get(PengumumanService);
    expect(service).toBeTruthy();
  });
});
