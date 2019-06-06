import { TestBed } from '@angular/core/testing';

import { MisiService } from './misi.service';

describe('MisiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MisiService = TestBed.get(MisiService);
    expect(service).toBeTruthy();
  });
});
