export interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  availability: 'cinema' | 'streaming' | 'both';
  synopsis?: string;
  cast?: string[];
  trailerUrl?: string;
  rating?: number;
  posterUrl?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  room: string;
  availableSeats: number;
  price: {
    full: number;
    reduced: number;
    child: number;
  };
  bookedSeats?: number;
}

export interface Prenotazione {
  id: string;
  showtimeId: string;
  ticketType: 'full' | 'reduced' | 'child';
  seats: number;
  confirmationCode: string;
  createdAt?: string;
}

export interface WatchlistItem {
  movieId: string;
  addedAt: string;
  notes?: string;
}

export interface Segnalazione {
  nome: string;
  email: string;
  movieId: string;
  tipo: 'dati' | 'prenotazione' | 'bug';
  descrizione: string;
  inviatoAt?: string;
}
