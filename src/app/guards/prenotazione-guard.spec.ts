import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { prenotazioneGuard } from './prenotazione-guard';

describe('prenotazioneGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => prenotazioneGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
