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

  private readonly fallbackMovies: Movie[] = [
    {
      id: '1',
      title: 'The Matrix',
      genre: 'Fantascienza',
      releaseYear: 1999,
      availability: 'streaming',
      synopsis: 'Un programmatore di computer scopre un segreto sulla realtà.',
      cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
      rating: 8.7,
      posterUrl: 'https://media.posterstore.com/site_images/68631cdc603ad773cc39b773_1771731552_WB0071-8.jpg',
    },
    {
      id: '2',
      title: 'Inception',
      genre: 'Azione',
      releaseYear: 2010,
      availability: 'both',
      synopsis: 'Un ladro esperto nel rubare segreti dal subconscio.',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      rating: 8.8,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '3',
      title: 'Dune: Parte Due',
      genre: 'Fantascienza',
      releaseYear: 2024,
      availability: 'cinema',
      synopsis: 'Paul Atreides si unisce ai Fremen per combattere i suoi nemici.',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
      rating: 8.6,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg',
    },
  ];

  constructor() {}

  getMovies(): void {
    this.loading.set(true);
    this.movies.set(this.fallbackMovies);

    this.http.get<Movie[]>(this.API_URL).pipe(
      map(data => data && data.length > 0 ? data : this.fallbackMovies),
      tap(data => {
        this.movies.set(data);
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('Error fetching movies', error);
        this.movies.set(this.fallbackMovies);
        this.loading.set(false);
        return of(this.fallbackMovies);
      })
    ).subscribe();
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    if (this.movies().length === 0) {
      return this.http.get<Movie[]>(this.API_URL).pipe(
        map(movies => (movies && movies.length > 0 ? movies : this.fallbackMovies).find(m => m.id === id))
      );
    }

    return of(this.movies().find(m => m.id === id));
  }
}
