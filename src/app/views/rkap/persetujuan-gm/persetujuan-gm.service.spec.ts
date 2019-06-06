import { TestBed } from '@angular/core/testing';

import { PersetujuanGmService } from './persetujuan-gm.service';

describe('PersetujuanGmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersetujuanGmService = TestBed.get(PersetujuanGmService);
    expect(service).toBeTruthy();
  });
});
