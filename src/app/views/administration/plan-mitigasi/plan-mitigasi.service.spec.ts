import { TestBed } from '@angular/core/testing';

import { PlanMitigasiService } from './plan-mitigasi.service';

describe('PlanMitigasiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanMitigasiService = TestBed.get(PlanMitigasiService);
    expect(service).toBeTruthy();
  });
});
