import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models/models';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;
  @Output() addToWatchlist = new EventEmitter<string>();

  onAddToWatchlist(event: Event): void {
    event.stopPropagation();
    this.addToWatchlist.emit(this.movie.id);
  }
}
