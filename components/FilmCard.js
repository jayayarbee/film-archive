"use client";

import Link from "next/link";
import Badge from "./Badge";
import { useFilms } from "../context/FilmContext";

export default function FilmCard({ film }) {
  const { toggleWatchlist } = useFilms();
  const onWatchlist = film.status === "Watchlist";

  return (
    <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <Link href={`/film/${film.id}`} className="flex-1">
        <h3 className="text-lg font-semibold leading-snug">{film.title}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {film.director} · {film.year}
        </p>
        <p className="text-sm text-[var(--muted)]">{film.country}</p>
        {film.rating != null && (
          <p className="mt-2 text-sm text-[var(--gold)]">★ {film.rating}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {onWatchlist && <Badge tone="watchlist">Watchlist</Badge>}
          <Badge tone="edition">{film.edition}</Badge>
          <Badge tone="place">{film.watchedAt}</Badge>
        </div>
      </Link>
      <button
        onClick={() => toggleWatchlist(film.id)}
        className="mt-4 text-left text-xs text-[var(--muted)] hover:text-[var(--primary)]"
      >
        {onWatchlist ? "Mark as watched" : "Move to watchlist"}
      </button>
    </div>
  );
}
