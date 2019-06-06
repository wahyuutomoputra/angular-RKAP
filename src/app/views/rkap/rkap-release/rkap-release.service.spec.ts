import { TestBed } from '@angular/core/testing';

import { RkapReleaseService } from './rkap-release.service';

describe('RkapReleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RkapReleaseService = TestBed.get(RkapReleaseService);
    expect(service).toBeTruthy();
  });
});
