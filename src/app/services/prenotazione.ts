import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, shareReplay } from 'rxjs';
import { Showtime, Prenotazione } from '../models/showtime';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  private http = inject(HttpClient);
  private jsonUrl = 'assets/data/showtimes.json';
  private currentPrenotazione: Prenotazione | null = null;

  private fallbackShowtimes: Showtime[] = [
    {
      id: 101,
      movieId: 1,
      title: 'Dune: Parte Due',
      date: '2026-07-28',
      time: '18:00',
      hall: 'Sala 1 - IMAX',
      availableSeats: 120,
      prices: { intero: 12.0, ridotto: 9.0, bambino: 7.0 },
      specialNote: 'Proiezione speciale in IMAX 70mm'
    },
    {
      id: 102,
      movieId: 1,
      title: 'Dune: Parte Due',
      date: '2026-07-28',
      time: '21:15',
      hall: 'Sala 1 - IMAX',
      availableSeats: 85,
      prices: { intero: 12.0, ridotto: 9.0, bambino: 7.0 }
    },
    {
      id: 103,
      movieId: 2,
      title: 'Oppenheimer',
      date: '2026-07-28',
      time: '17:30',
      hall: 'Sala 3',
      availableSeats: 60,
      prices: { intero: 10.5, ridotto: 8.0, bambino: 6.0 },
      specialNote: 'Audio Dolby Atmos'
    },
    {
      id: 104,
      movieId: 2,
      title: 'Oppenheimer',
      date: '2026-07-29',
      time: '20:45',
      hall: 'Sala 3',
      availableSeats: 110,
      prices: { intero: 10.5, ridotto: 8.0, bambino: 6.0 }
    },
    {
      id: 105,
      movieId: 3,
      title: 'Inside Out 2',
      date: '2026-07-28',
      time: '16:00',
      hall: 'Sala 2',
      availableSeats: 140,
      prices: { intero: 9.0, ridotto: 7.0, bambino: 5.5 },
      specialNote: 'Consigliato per famiglie'
    }
  ];

  private showtimes$: Observable<Showtime[]> | null = null;

  getShowtimes(): Observable<Showtime[]> {
    if (!this.showtimes$) {
      this.showtimes$ = this.http.get<Showtime[]>(this.jsonUrl).pipe(
        catchError(() => of(this.fallbackShowtimes)),
        shareReplay(1)
      );
    }
    return this.showtimes$;
  }

  getShowtimesByMovie(movieId: number): Observable<Showtime[]> {
    return this.getShowtimes().pipe(
      map(showtimes => showtimes.filter(s => s.movieId === Number(movieId)))
    );
  }

  getShowtimeById(id: number): Observable<Showtime | undefined> {
    return this.getShowtimes().pipe(
      map(showtimes => showtimes.find(s => s.id === Number(id)))
    );
  }

  setCurrentPrenotazione(prenotazione: Prenotazione): void {
    this.currentPrenotazione = prenotazione;
  }

  getCurrentPrenotazione(): Prenotazione | null {
    return this.currentPrenotazione;
  }

  clearCurrentPrenotazione(): void {
    this.currentPrenotazione = null;
  }

  generateBookingCode(): string {
    const prefix = 'CP-';
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
    return `${prefix}${randomHex}`;
  }
}
