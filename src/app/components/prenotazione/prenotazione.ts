import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione';
import { Showtime } from '../../models/showtime';

@Component({
  selector: 'app-prenotazione',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './prenotazione.html',
  styleUrl: './prenotazione.css',
})
export class PrenotazioneComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(PrenotazioneService);
  private route = inject(ActivatedRoute);

  bookingForm!: FormGroup;
  showtimes = signal<Showtime[]>([]);
  selectedShowtime = signal<Showtime | null>(null);

  ticketOptions: { value: 'intero' | 'ridotto' | 'bambino'; label: string; desc: string }[] = [
    { value: 'intero', label: 'Intero', desc: 'Biglietto standard' },
    { value: 'ridotto', label: 'Ridotto', desc: 'Over 65, studenti' },
    { value: 'bambino', label: 'Bambino', desc: 'Under 12 anni' },
  ];

  ngOnInit(): void {
    this.initForm();
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
    });
  }

  private updateSelectedShowtime(id: number): void {
    const found = this.showtimes().find((s) => s.id === id) || null;
    this.selectedShowtime.set(found);
  }
}
