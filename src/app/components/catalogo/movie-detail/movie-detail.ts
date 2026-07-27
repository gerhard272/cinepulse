import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieService } from '../../../services/movie';
import { Movie } from '../../../models/models';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sanitizer = inject(DomSanitizer);
  private destroyRef = inject(DestroyRef);

  movie = signal<Movie | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieById(id).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(movie => {
      this.movie.set(movie ?? null);
      this.loading.set(false);
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
