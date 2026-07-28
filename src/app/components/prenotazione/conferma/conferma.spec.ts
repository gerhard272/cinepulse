import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conferma } from './conferma';

describe('Conferma', () => {
  let component: Conferma;
  let fixture: ComponentFixture<Conferma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conferma],
    }).compileComponents();

    fixture = TestBed.createComponent(Conferma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
