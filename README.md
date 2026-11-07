# Film Archive — Version 1

A personal film archive for arthouse, independent and world-cinema lovers. This demo lets users browse films, record viewing details, manage watchlists and personal lists, and explore viewing statistics.

## Requirements

- Node.js 20.9 or newer
- npm (installed with Node.js)

## Getting started on Windows

1. Extract the `film-archive` folder.
2. Open that folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install the project packages:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop the server, press `Ctrl + C` in the terminal.

## Pages

- `/` — landing page
- `/library` — film library, search, filters and add-film form
- `/film/1` — an individual film's details (the number changes for each film)
- `/lists` — create and manage personal film lists
- `/dashboard` — viewing statistics

## Project structure

```text
film-archive/
├── app/
│   ├── dashboard/page.js
│   ├── film/[id]/page.js
│   ├── library/page.js
│   ├── lists/page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
├── context/FilmContext.js
├── data/
│   ├── films.js
│   └── options.js
├── docs/PRODUCT-ASSUMPTIONS.md
├── public/
├── package.json
└── package-lock.json
```

## Demo data and limitations

The app uses sample data in `data/films.js` and React context in `context/FilmContext.js`. Changes are held in browser memory and reset when the page is refreshed. There is no backend, database, authentication or external film API in this MVP.
