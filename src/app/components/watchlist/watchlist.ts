// SCRUM-19
import { Component, inject, OnInit } from '@angular/core';
import { WatchlistService } from './watchlist.service';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../catalogo/movie-card/movie-card';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist implements OnInit {
  public watchlistService = inject(WatchlistService);
  private readonly movieService = inject(MovieService);

  ngOnInit(): void {
    this.movieService.getMovies();
  }

  get watchlistMovies() {
    return this.watchlistService
      .watchlist()
      .map((item) => ({
        ...item,
        movie: this.movieService.movies().find((movie) => movie.id === item.movieId),
      }))
      .filter((item) => item.movie);
  }

  onRemoveFromWatchlist(movieId: string): void {
    this.watchlistService.removeFromWatchlist(movieId);
  }
}
