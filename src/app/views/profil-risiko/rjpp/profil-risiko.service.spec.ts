import { TestBed } from '@angular/core/testing';

import { ProfilRisikoService } from './profil-risiko.service';

describe('ProfilRisikoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilRisikoService = TestBed.get(ProfilRisikoService);
    expect(service).toBeTruthy();
  });
});
