import { TestBed } from '@angular/core/testing';

import { JadwalService } from './jadwal.service';

describe('JadwalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JadwalService = TestBed.get(JadwalService);
    expect(service).toBeTruthy();
  });
});
