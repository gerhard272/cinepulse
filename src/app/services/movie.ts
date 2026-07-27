import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/models';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  
  // Signals for state management
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(false);

  private readonly API_URL = '/assets/data/movies.json';

  constructor() {}

  getMovies(): void {
    this.loading.set(true);
    this.http.get<Movie[]>(this.API_URL).pipe(
      tap(data => {
        this.movies.set(data);
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('Error fetching movies', error);
        this.loading.set(false);
        return of([]);
      })
    ).subscribe();
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    // Se i film non sono ancora caricati, li carichiamo prima
    if (this.movies().length === 0) {
      return this.http.get<Movie[]>(this.API_URL).pipe(
        map(movies => movies.find(m => m.id === id))
      );
    }
    // Altrimenti restituiamo direttamente dal signal
    return of(this.movies().find(m => m.id === id));
  }
}
