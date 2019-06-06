import { TestBed } from '@angular/core/testing';

import { EntriNonRkapService } from './entri-non-rkap.service';

describe('EntriNonRkapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntriNonRkapService = TestBed.get(EntriNonRkapService);
    expect(service).toBeTruthy();
  });
});
