import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segnala } from './segnala';

describe('Segnala', () => {
  let component: Segnala;
  let fixture: ComponentFixture<Segnala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segnala],
    }).compileComponents();

    fixture = TestBed.createComponent(Segnala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
