import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../services/movie';
import { Movie } from '../../../models/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, DatePipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sanitizer = inject(DomSanitizer);

  movie = signal<Movie | undefined>(undefined);
  trailerUrl = signal<SafeResourceUrl | undefined>(undefined);

  toReleaseDate(year: number): Date {
    return new Date(year, 0, 1);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieService.getMovieById(id).subscribe(movie => {
          this.movie.set(movie);
          if (movie?.trailerUrl) {
            this.trailerUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(movie.trailerUrl));
          }
        });
      }
    });
  }
}
