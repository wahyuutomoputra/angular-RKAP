import { TestBed } from '@angular/core/testing';

import { RiskTaksonomiService } from './risk-taksonomi.service';

describe('RiskTaksonomiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskTaksonomiService = TestBed.get(RiskTaksonomiService);
    expect(service).toBeTruthy();
  });
});
