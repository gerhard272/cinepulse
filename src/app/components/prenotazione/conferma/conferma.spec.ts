import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Conferma } from './conferma';

describe('Conferma', () => {
  let component: Conferma;
  let fixture: ComponentFixture<Conferma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conferma],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Conferma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
