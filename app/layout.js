import "./globals.css";
import { FilmProvider } from "../context/FilmContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Film Archive",
  description: "A personal archive for arthouse and world cinema lovers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FilmProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--muted)]">
            Team J&amp;J · Inspired by Curate (Product Hunt)
          </footer>
        </FilmProvider>
      </body>
    </html>
  );
}
