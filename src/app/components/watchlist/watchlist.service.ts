import { Injectable, signal, computed } from '@angular/core';
import { WatchlistItem } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private readonly watchlistSignal = signal<WatchlistItem[]>([]);

  public readonly watchlist = computed(() => this.watchlistSignal());
  public readonly isWatchlistEmpty = computed(() => this.watchlistSignal().length === 0);

  isInWatchlist(movieId: string): boolean {
    return this.watchlistSignal().some((item) => item.movieId === movieId);
  }

  constructor() {}

  addToWatchlist(item: WatchlistItem) {
    this.watchlistSignal.update((items) => [...items, item]);
  }

  removeFromWatchlist(movieId: string) {
    this.watchlistSignal.update((items) => items.filter((item) => item.movieId !== movieId));
  }
}
