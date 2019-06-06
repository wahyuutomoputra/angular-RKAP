import { TestBed } from '@angular/core/testing';

import { DocumentRkapService } from './document-rkap.service';

describe('DocumentRkapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentRkapService = TestBed.get(DocumentRkapService);
    expect(service).toBeTruthy();
  });
});
