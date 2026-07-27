import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'prenotazione',
    pathMatch: 'full',
  },
  {
    path: 'prenotazione',
    loadComponent: () =>
      import('./components/prenotazione/prenotazione').then(
        (m) => m.PrenotazioneComponent
      ),
  },
  {
    path: 'prenotazione/:movieId',
    loadComponent: () =>
      import('./components/prenotazione/prenotazione').then(
        (m) => m.PrenotazioneComponent
      ),
  },
];
