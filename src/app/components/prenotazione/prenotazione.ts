import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione';
import { Showtime, Prenotazione as PrenotazioneModel } from '../../models/showtime';

@Component({
  selector: 'app-prenotazione',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './prenotazione.html',
  styleUrl: './prenotazione.css',
})
export class Prenotazione implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(PrenotazioneService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  bookingForm!: FormGroup;
  showtimes = signal<Showtime[]>([]);
  selectedShowtime = signal<Showtime | null>(null);

  ticketTypeSignal = signal<'intero' | 'ridotto' | 'bambino'>('intero');
  quantitySignal = signal<number>(1);

  protected totalPrice = computed(() => {
    const st = this.selectedShowtime();
    if (!st) return 0;
    const tt = this.ticketTypeSignal();
    const qty = Number(this.quantitySignal() || 0);
    return st.prices[tt] * qty;
  });

  ticketOptions: { value: 'intero' | 'ridotto' | 'bambino'; label: string; desc: string }[] = [
    { value: 'intero', label: 'Intero', desc: 'Biglietto standard' },
    { value: 'ridotto', label: 'Ridotto', desc: 'Over 65, studenti' },
    { value: 'bambino', label: 'Bambino', desc: 'Under 12 anni' },
  ];

  ngOnInit(): void {
    this.initForm();
    this.ticketTypeSignal.set(this.bookingForm.get('ticketType')?.value ?? 'intero');
    this.quantitySignal.set(Number(this.bookingForm.get('quantity')?.value) || 1);

    this.bookingForm.get('ticketType')?.valueChanges.subscribe((v) => this.ticketTypeSignal.set(v));
    this.bookingForm
      .get('quantity')
      ?.valueChanges.subscribe((v) => this.quantitySignal.set(Number(v)));
    const movieIdParam = this.route.snapshot.paramMap.get('movieId');

    const showtimes$ = movieIdParam
      ? this.service.getShowtimesByMovie(Number(movieIdParam))
      : this.service.getShowtimes();

    showtimes$.subscribe((data) => {
      this.showtimes.set(data);
      if (data.length > 0) {
        this.bookingForm.patchValue({ showtimeId: data[0].id });
        this.updateSelectedShowtime(data[0].id);
      }
    });

    this.bookingForm.get('showtimeId')?.valueChanges.subscribe((id) => {
      if (id) {
        this.updateSelectedShowtime(Number(id));
      }
    });
  }

  private initForm(): void {
    this.bookingForm = this.fb.group({
      showtimeId: ['', Validators.required],
      ticketType: ['intero', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  private updateSelectedShowtime(id: number): void {
    const found = this.showtimes().find((s) => s.id === id) || null;
    this.selectedShowtime.set(found);

    const quantityCtrl = this.bookingForm.get('quantity');
    if (!quantityCtrl) return;

    quantityCtrl.clearValidators();
    if (found) {
      quantityCtrl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(found.availableSeats),
      ]);
    } else {
      quantityCtrl.setValidators([Validators.required, Validators.min(1)]);
    }
    quantityCtrl.updateValueAndValidity();
  }

  confirmBooking(): void {
    if (this.bookingForm.invalid) return;

    const showtime = this.selectedShowtime();
    if (!showtime) return;

    const formValue = this.bookingForm.value;
    const ticketType = formValue.ticketType as 'intero' | 'ridotto' | 'bambino';
    const quantity = Number(formValue.quantity);
    const unitPrice = showtime.prices[ticketType];
    const totalPrice = unitPrice * quantity;
    const bookingCode = this.service.generateBookingCode();

    const prenotazione: PrenotazioneModel = {
      showtimeId: showtime.id,
      movieTitle: showtime.title,
      date: showtime.date,
      time: showtime.time,
      hall: showtime.hall,
      ticketType,
      quantity,
      unitPrice,
      totalPrice,
      bookingCode,
    };

    this.service.setCurrentPrenotazione(prenotazione);
    this.router.navigate(['/prenotazione/conferma']);
  }
}
