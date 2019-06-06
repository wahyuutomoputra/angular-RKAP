import { TestBed } from '@angular/core/testing';

import { GroupProductService } from './group-product.service';

describe('GroupProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupProductService = TestBed.get(GroupProductService);
    expect(service).toBeTruthy();
  });
});
