export interface Showtime {
  id: number;
  movieId: number;
  title: string;
  date: string;
  time: string;
  hall: string;
  availableSeats: number;
  prices: {
    intero: number;
    ridotto: number;
    bambino: number;
  };
  specialNote?: string;
}

export interface Prenotazione {
  id?: string;
  showtimeId: number;
  movieTitle: string;
  date: string;
  time: string;
  hall: string;
  ticketType: 'intero' | 'ridotto' | 'bambino';
  quantity: number;
  unitPrice?: number;
  totalPrice: number;
  bookingCode?: string;
  customerName?: string;
  customerEmail?: string;
  specialNote?: string;
}