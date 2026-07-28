# CinePulse

CinePulse è una Single Page Application sviluppata in Angular per la scoperta e la gestione di film e serie TV, con sistema di prenotazione posti e watchlist personalizzata.

## Funzionalità principali

- **Catalogo multimediale**: vista a griglia dei contenuti disponibili, con card riutilizzabili e ricerca reattiva per titolo, genere, anno di uscita e disponibilità (cinema/streaming)
- **Dettaglio contenuto**: pagina dedicata con cast, trailer e valutazioni per ogni film/serie
- **Prenotazione posti**: selezione di data, ora, tipo di biglietto e numero di posti, con validazioni e conferma tramite codice di prenotazione. La prenotazione è disponibile solo per i contenuti proiettati al cinema
- **Watchlist**: possibilità di salvare contenuti preferiti e consultarli in una sezione dedicata
- **Segnalazione problemi**: form per segnalare problemi relativi a un contenuto o a una prenotazione

## Stack tecnico

- Angular (componenti standalone)
- Reactive Forms
- Signal e computed per la gestione dello stato
- Routing con lazy loading e route guard

## Struttura del progetto

```
src/app/
├── components/
│   ├── home/                    # Homepage con contenuti in evidenza
│   ├── navbar/                  # Barra di navigazione
│   ├── footer/                  # Footer dell'applicazione
│   ├── catalogo/
│   │   ├── movie-card/          # Card riutilizzabile per la lista film
│   │   └── movie-detail/        # Pagina di dettaglio film/serie
│   ├── prenotazione/
│   │   └── conferma/            # Schermata di conferma prenotazione
│   ├── watchlist/                # Sezione "La mia Watchlist"
│   ├── segnala/                  # Form di segnalazione problema
│   └── not-found/                # Pagina 404
├── services/
│   ├── movie.ts                  # Gestione dati e ricerca film
│   └── prenotazione.ts           # Gestione prenotazioni
├── guards/
│   └── prenotazione-guard.ts     # Blocca la prenotazione per contenuti solo in streaming
├── models/
│   ├── models.ts                 # Interfacce principali (Movie, WatchlistItem, Segnalazione...)
│   └── showtime.ts               # Interfaccia Showtime
├── app.routes.ts                 # Configurazione delle rotte con lazy loading
├── app.config.ts
├── app.ts
└── app.html
```

## Requisiti

- Node.js
- Angular CLI

## Installazione

```bash
npm install
```

## Avvio in sviluppo

```bash
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200/`.

## Build

```bash
ng build
```

I file compilati vengono generati nella cartella `dist/`.

## Test

```bash
ng test
```
