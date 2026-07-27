import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie';
import { MovieCard } from './movie-card/movie-card';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private readonly movieService = inject(MovieService);

  get movies() {
    return this.movieService.movies;
  }

  get loading() {
    return this.movieService.loading;
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

  onAddToWatchlist(movieId: string): void {
    console.log('Added to watchlist:', movieId);
  }
}
