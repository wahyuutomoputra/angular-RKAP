import { TestBed } from '@angular/core/testing';

import { DiskusiService } from './diskusi.service';

describe('DiskusiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiskusiService = TestBed.get(DiskusiService);
    expect(service).toBeTruthy();
  });
});
