import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistSerie } from './watchlist-serie';

describe('WatchlistSerie', () => {
  let component: WatchlistSerie;
  let fixture: ComponentFixture<WatchlistSerie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistSerie],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistSerie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
