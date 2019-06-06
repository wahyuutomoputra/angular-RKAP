import { TestBed } from '@angular/core/testing';

import { RabService } from './rab.service';

describe('RabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RabService = TestBed.get(RabService);
    expect(service).toBeTruthy();
  });
});
