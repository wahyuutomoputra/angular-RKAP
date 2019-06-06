import { TestBed } from '@angular/core/testing';

import { ProgramKerjaService } from './program-kerja.service';

describe('ProgramKerjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramKerjaService = TestBed.get(ProgramKerjaService);
    expect(service).toBeTruthy();
  });
});
