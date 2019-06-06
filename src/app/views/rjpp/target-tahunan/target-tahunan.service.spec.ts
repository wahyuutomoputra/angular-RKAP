import { TestBed } from '@angular/core/testing';

import { TargetTahunanService } from './target-tahunan.service';

describe('TargetTahunanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TargetTahunanService = TestBed.get(TargetTahunanService);
    expect(service).toBeTruthy();
  });
});
