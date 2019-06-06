import { TestBed } from '@angular/core/testing';

import { RkapService } from './rkap.service';

describe('RkapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RkapService = TestBed.get(RkapService);
    expect(service).toBeTruthy();
  });
});
