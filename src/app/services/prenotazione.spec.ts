import { TestBed } from '@angular/core/testing';

import { PrenotazioneService } from './prenotazione';

describe('Prenotazione', () => {
  let service: PrenotazioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotazioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
