import { Routes } from '@angular/router';
import { prenotazioneGuard } from './guards/prenotazione-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./components/catalogo/catalogo').then((m) => m.Catalogo),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./components/catalogo/movie-detail/movie-detail').then((m) => m.MovieDetail),
  },
  {
    path: 'movies/:id/prenota',
    loadComponent: () =>
      import('./components/prenotazione/prenotazione').then((m) => m.Prenotazione),
    canActivate: [prenotazioneGuard],
  },
  {
    path: 'prenotazione/conferma',
    loadComponent: () =>
      import('./components/prenotazione/conferma/conferma').then((m) => m.Conferma),
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./components/watchlist/watchlist').then((m) => m.Watchlist),
  },
  {
    path: 'segnala',
    loadComponent: () => import('./components/segnala/segnala').then((m) => m.Segnala),
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
