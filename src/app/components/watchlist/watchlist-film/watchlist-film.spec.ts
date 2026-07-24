import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistFilm } from './watchlist-film';

describe('WatchlistFilm', () => {
  let component: WatchlistFilm;
  let fixture: ComponentFixture<WatchlistFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistFilm],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistFilm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
