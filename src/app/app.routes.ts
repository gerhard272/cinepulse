import { Routes } from '@angular/router';

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
  },
  {
    path: 'prenotazione/conferma',
    loadComponent: () =>
      import('./components/prenotazione/conferma/conferma').then((m) => m.Conferma),
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./components/watchlist/watchlist').then((m) => m.Watchlist),
    children: [
      {
        path: 'film',
        loadComponent: () =>
          import('./components/watchlist/watchlist-film/watchlist-film').then(
            (m) => m.WatchlistFilm,
          ),
      },
      {
        path: 'serie',
        loadComponent: () =>
          import('./components/watchlist/watchlist-serie/watchlist-serie').then(
            (m) => m.WatchlistSerie,
          ),
      },
    ],
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
