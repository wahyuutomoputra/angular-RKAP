import { TestBed } from '@angular/core/testing';

import { RjppService } from './rjpp.service';

describe('RjppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RjppService = TestBed.get(RjppService);
    expect(service).toBeTruthy();
  });
});
