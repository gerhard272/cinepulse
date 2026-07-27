import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../models/models';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;
  @Output() addToWatchlist = new EventEmitter<string>();

  toReleaseDate(year: number): Date {
    return new Date(year, 0, 1);
  }

  onAddWatchlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToWatchlist.emit(this.movie.id);
  }
}
