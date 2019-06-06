import { TestBed } from '@angular/core/testing';

import { GroupTaksonomiService } from './group-taksonomi.service';

describe('GroupTaksonomiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupTaksonomiService = TestBed.get(GroupTaksonomiService);
    expect(service).toBeTruthy();
  });
});
