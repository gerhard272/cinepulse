// SCRUM-19
// SCRUM-20 segnalazione
import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Movie } from '../../models/models';
import { MovieService } from '../../services/movie';
import { MovieCard } from '../catalogo/movie-card/movie-card';

@Component({
  selector: 'app-segnala',
  standalone: true,
  imports: [ReactiveFormsModule, MovieCard, TitleCasePipe],
  templateUrl: './segnala.html',
  styleUrl: './segnala.css',
})
export class Segnala implements OnInit {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  public segnalaForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    movieId: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    descrizione: ['', [Validators.required, Validators.minLength(10)]],
  });

  public formInviato = false;
  public movieOptions = signal<Movie[]>([]);
  public selectedMovie = signal<Movie | undefined>(undefined);

  constructor() {
    effect(() => {
      const movies = this.movieService.movies();
      this.movieOptions.set(movies);

      const selectedId = this.segnalaForm.get('movieId')?.value;
      if (selectedId) {
        this.selectedMovie.set(movies.find((movie) => movie.id === selectedId));
      } else {
        this.selectedMovie.set(undefined);
      }
    });
  }

  ngOnInit(): void {
    this.movieService.getMovies();

    this.segnalaForm.get('movieId')?.valueChanges.subscribe((value: string) => {
      const selected = this.movieOptions().find((movie) => movie.id === value);
      this.selectedMovie.set(selected);
    });
  }

  onSelectMovie(movieId: string): void {
    this.segnalaForm.patchValue({ movieId });
    this.selectedMovie.set(this.movieOptions().find((movie) => movie.id === movieId));
  }

  onSubmit() {
    if (this.segnalaForm.valid) {
      console.log('Segnalazione inviata:', this.segnalaForm.value);
      this.formInviato = true;
      this.segnalaForm.reset();
      this.selectedMovie.set(undefined);

      setTimeout(() => {
        this.formInviato = false;
      }, 5000);
    }
  }
}
