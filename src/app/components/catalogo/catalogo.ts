import { Component, OnInit, inject, computed, signal, DestroyRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { MovieCard } from './movie-card/movie-card';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ReactiveFormsModule, MovieCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly destroyRef = inject(DestroyRef);

  searchControl = new FormControl('');
  
  // Use a signal for the search term to easily create a computed signal
  searchTerm = signal('');

  // Computed signal to filter movies based on the search term
  filteredMovies = computed(() => {
    const movies = this.movieService.movies();
    const term = this.searchTerm().toLowerCase();
    
    if (!term) return movies;
    
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(term) ||
      movie.genre.toLowerCase().includes(term) ||
      movie.releaseYear.toString().includes(term) ||
      movie.availability.toLowerCase().includes(term)
    );
  });

  get loading() {
    return this.movieService.loading;
  }

  ngOnInit() {
    this.movieService.getMovies();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.searchTerm.set(value || '');
      });
  }

  onAddToWatchlist(movieId: string) {
    console.log('Added to watchlist:', movieId);
    // Here we could call a WatchlistService if needed
    // For now we just log it as the task just asked for the output event handling
  }
}
