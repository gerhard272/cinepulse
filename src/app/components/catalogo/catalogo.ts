import { Component, OnInit, inject, signal, effect, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import { MovieService } from '../../services/movie';
import { WatchlistService } from '../watchlist/watchlist.service';
import { MovieCard } from './movie-card/movie-card';
import { Movie, WatchlistItem } from '../../models/models';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [MovieCard, ReactiveFormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private readonly movieService = inject(MovieService);
  readonly watchlistService = inject(WatchlistService);
  private readonly destroyRef = inject(DestroyRef);

  filterForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
    releaseYear: new FormControl(''),
    availability: new FormControl(''),
  });

  filteredMovies = signal<Movie[]>([]);
  genres = signal<string[]>([]);
  years = signal<number[]>([]);

  get movies() {
    return this.movieService.movies;
  }

  get loading() {
    return this.movieService.loading;
  }

  constructor() {
    effect(() => {
      const allMovies = this.movies();
      if (allMovies.length > 0) {
        const uniqueGenres = [...new Set(allMovies.map(m => m.genre))].sort();
        const uniqueYears = [...new Set(allMovies.map(m => m.releaseYear))].sort((a, b) => b - a);
        this.genres.set(uniqueGenres);
        this.years.set(uniqueYears);
        this.applyFilters(this.filterForm.value);
      }
    });
  }

  ngOnInit() {
    this.movieService.getMovies();

    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(values => {
      this.applyFilters(values);
    });
  }

  onAddToWatchlist(movieId: string): void {
    if (!this.watchlistService.isInWatchlist(movieId)) {
      const item: WatchlistItem = { movieId, addedAt: new Date().toISOString() };
      this.watchlistService.addToWatchlist(item);
    } else {
      this.watchlistService.removeFromWatchlist(movieId);
    }
  }

  private applyFilters(values: Partial<{ title: string | null; genre: string | null; releaseYear: string | null; availability: string | null }>): void {
    const allMovies = this.movieService.movies();
    let result = [...allMovies];

    if (values.title) {
      const term = values.title.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(term));
    }

    if (values.genre) {
      result = result.filter(m => m.genre === values.genre);
    }

    if (values.releaseYear) {
      result = result.filter(m => m.releaseYear === Number(values.releaseYear));
    }

    if (values.availability) {
      result = result.filter(m => m.availability === values.availability);
    }

    this.filteredMovies.set(result);
  }
}
