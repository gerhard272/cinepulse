import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models/models';
import { WatchlistService } from '../../watchlist/watchlist.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  private readonly watchlistService = inject(WatchlistService);

  @Input({ required: true }) movie!: Movie;
  @Output() addToWatchlist = new EventEmitter<string>();

  get isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movie.id);
  }

  onAddToWatchlist(event: Event): void {
    event.stopPropagation();

    const movieId = this.movie.id;

    if (!this.watchlistService.isInWatchlist(movieId)) {
      this.watchlistService.addToWatchlist({ movieId, addedAt: new Date().toISOString() });
    } else {
      this.watchlistService.removeFromWatchlist(movieId);
    }

    this.addToWatchlist.emit(movieId);
  }
}
