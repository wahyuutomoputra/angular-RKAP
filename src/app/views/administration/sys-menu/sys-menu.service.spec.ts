import { TestBed } from '@angular/core/testing';

import { SysMenuService } from './sys-menu.service';

describe('SysMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysMenuService = TestBed.get(SysMenuService);
    expect(service).toBeTruthy();
  });
});
