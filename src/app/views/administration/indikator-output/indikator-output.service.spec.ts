import { TestBed } from '@angular/core/testing';

import { IndikatorOutputService } from './indikator-output.service';

describe('IndikatorOutputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndikatorOutputService = TestBed.get(IndikatorOutputService);
    expect(service).toBeTruthy();
  });
});
