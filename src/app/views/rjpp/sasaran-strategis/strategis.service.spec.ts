import { TestBed } from '@angular/core/testing';

import { StrategisService } from './strategis.service';

describe('StrategisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrategisService = TestBed.get(StrategisService);
    expect(service).toBeTruthy();
  });
});
