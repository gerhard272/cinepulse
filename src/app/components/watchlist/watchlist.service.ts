import { Injectable, signal, computed } from '@angular/core';
import { WatchlistItem } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  // Signal per lo stato della watchlist
  private watchlistSignal = signal<WatchlistItem[]>([]);

  // Computed per esporre la lista (read-only)
  public readonly watchlist = computed(() => this.watchlistSignal());

  // Computed per verificare se la watchlist è vuota
  public readonly isWatchlistEmpty = computed(() => this.watchlistSignal().length === 0);

  constructor() {}

  // Metodi per aggiornare lo stato
  addToWatchlist(item: WatchlistItem) {
    this.watchlistSignal.update(items => [...items, item]);
  }

  removeFromWatchlist(movieId: string) {
    this.watchlistSignal.update(items => items.filter(item => item.movieId !== movieId));
  }
}
