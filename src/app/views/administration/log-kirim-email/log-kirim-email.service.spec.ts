import { TestBed } from '@angular/core/testing';

import { LogKirimEmailService } from './log-kirim-email.service';

describe('LogKirimEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogKirimEmailService = TestBed.get(LogKirimEmailService);
    expect(service).toBeTruthy();
  });
});
