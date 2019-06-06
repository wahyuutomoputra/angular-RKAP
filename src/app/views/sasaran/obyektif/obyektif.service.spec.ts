import { TestBed } from '@angular/core/testing';

import { ObyektifService } from './obyektif.service';

describe('ObyektifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObyektifService = TestBed.get(ObyektifService);
    expect(service).toBeTruthy();
  });
});
