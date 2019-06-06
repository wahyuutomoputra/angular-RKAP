import { TestBed } from '@angular/core/testing';

import { VisiService } from './visi.service';

describe('VisiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisiService = TestBed.get(VisiService);
    expect(service).toBeTruthy();
  });
});
