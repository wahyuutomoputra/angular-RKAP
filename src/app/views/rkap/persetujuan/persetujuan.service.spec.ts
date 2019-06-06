import { TestBed } from '@angular/core/testing';

import { PersetujuanService } from './persetujuan.service';

describe('PersetujuanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersetujuanService = TestBed.get(PersetujuanService);
    expect(service).toBeTruthy();
  });
});
