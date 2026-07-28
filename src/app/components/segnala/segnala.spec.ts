import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Segnala } from './segnala';

describe('Segnala', () => {
  let component: Segnala;
  let fixture: ComponentFixture<Segnala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segnala, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Segnala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie options from mock data', () => {
    expect(component.movieOptions().length).toBeGreaterThan(0);
  });
});
