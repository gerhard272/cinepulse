import { Injectable, signal, computed } from '@angular/core';
import { WatchlistItem } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistSignal = signal<WatchlistItem[]>([]);

  public readonly watchlist = computed(() => this.watchlistSignal());
  public readonly isWatchlistEmpty = computed(() => this.watchlistSignal().length === 0);

  constructor() {
    this.watchlistSignal.set([
      { movieId: '1', addedAt: 'Oggi alle 18:30' },
      { movieId: '2', addedAt: 'Ieri alle 20:00' },
    ]);
  }

  addToWatchlist(item: WatchlistItem) {
    this.watchlistSignal.update(items => [...items, item]);
  }

  removeFromWatchlist(movieId: string) {
    this.watchlistSignal.update(items => items.filter(item => item.movieId !== movieId));
  }
}
