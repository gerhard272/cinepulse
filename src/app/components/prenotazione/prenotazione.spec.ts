import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Prenotazione } from './prenotazione';

describe('Prenotazione', () => {
  let component: Prenotazione;
  let fixture: ComponentFixture<Prenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prenotazione],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Prenotazione);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
