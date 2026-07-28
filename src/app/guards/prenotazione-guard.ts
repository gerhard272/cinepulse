import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, of } from 'rxjs';
import { Movie } from '../models/models';
import { MovieService } from '../services/movie';

export const prenotazioneGuard: CanActivateFn = (route) => {
  const movieService = inject(MovieService);
  const router = inject(Router);

  const movieId = route.paramMap.get('id');

  if (!movieId) {
    router.navigate(['/catalogo']);
    return of(false);
  }

  return movieService.getMovieById(movieId).pipe(
    map((movie: Movie | undefined) => {
      if (!movie) {
        router.navigate(['/catalogo']);
        return false;
      }

      if (movie.availability === 'streaming') {
        console.warn(`Prenotazione bloccata: "${movie.title}" è disponibile solo in streaming.`);
        router.navigate(['/movies', movieId]);
        return false;
      }

      return true;
    }),
  );
};
