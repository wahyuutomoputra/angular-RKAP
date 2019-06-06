import { TestBed } from '@angular/core/testing';

import { RolemenuService } from './rolemenu.service';

describe('RolemenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolemenuService = TestBed.get(RolemenuService);
    expect(service).toBeTruthy();
  });
});
