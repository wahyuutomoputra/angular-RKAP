import { TestBed } from '@angular/core/testing';

import { InisiatisService } from './inisiatis.service';

describe('InisiatisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InisiatisService = TestBed.get(InisiatisService);
    expect(service).toBeTruthy();
  });
});
