import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieCard } from '../catalogo/movie-card/movie-card';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly movieService = inject(MovieService);

  movies = this.movieService.movies;
  loading = this.movieService.loading;

  inCinema = computed(() =>
    this.movies()
      .filter((m) => m.availability === 'cinema' || m.availability === 'both')
      .slice(0, 4),
  );

  inStreaming = computed(() =>
    this.movies()
      .filter((m) => m.availability === 'streaming' || m.availability === 'both')
      .slice(0, 4),
  );

  featured = computed(() => {
    const list = this.movies();
    if (list.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  });

  constructor() {
    this.movieService.getMovies();
  }

  onAddToWatchlist(movieId: string): void {
    // collegamento a WatchlistService (Membro 4)
    console.log('Aggiunto a watchlist:', movieId);
  }
}
