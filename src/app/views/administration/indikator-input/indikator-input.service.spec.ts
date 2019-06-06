import { TestBed } from '@angular/core/testing';

import { IndikatorInputService } from './indikator-input.service';

describe('IndikatorInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndikatorInputService = TestBed.get(IndikatorInputService);
    expect(service).toBeTruthy();
  });
});
