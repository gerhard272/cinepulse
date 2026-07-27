import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Prenotazione } from '../../../models/showtime';
import { PrenotazioneService } from '../../../services/prenotazione';

@Component({
  selector: 'app-conferma',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './conferma.html',
  styleUrl: './conferma.css',
})
export class Conferma implements OnInit {
  private router = inject(Router);
  private prenotazioneService = inject(PrenotazioneService);

  protected prenotazione: Prenotazione | null = null;

  ngOnInit(): void {
    this.prenotazione = this.prenotazioneService.getCurrentPrenotazione();

    if (!this.prenotazione) {
      this.router.navigate(['/']);
      return;
    }

    this.prenotazioneService.clearCurrentPrenotazione();
  }
}
