// SCRUM-19
// SCRUM-20 segnalazione
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-segnala',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './segnala.html',
  styleUrl: './segnala.css',
})
export class Segnala {
  private fb = inject(FormBuilder);

  public segnalaForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    movieId: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    descrizione: ['', [Validators.required, Validators.minLength(10)]]
  });

  public formInviato = false;

  onSubmit() {
    if (this.segnalaForm.valid) {
      console.log('Segnalazione inviata:', this.segnalaForm.value);
      this.formInviato = true;
      this.segnalaForm.reset();
      
      // Nascondi il messaggio di successo dopo qualche secondo
      setTimeout(() => {
        this.formInviato = false;
      }, 5000);
    }
  }
}
