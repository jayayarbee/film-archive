"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import { Select } from "../../../components/Input";
import { useFilms } from "../../../context/FilmContext";

export default function FilmPage() {
  const { id } = useParams();
  const router = useRouter();
  const { films, lists, removeFilm, toggleWatchlist, addToList } = useFilms();
  const film = films.find((f) => f.id === Number(id));

  if (!film) {
    return (
      <EmptyState title="Film not found" message="It may have been removed from your archive.">
        <Link href="/library" className="text-[var(--primary)]">Back to library</Link>
      </EmptyState>
    );
  }

  const rows = [
    ["Edition", film.edition],
    ["Where watched", film.watchedAt],
    ["Viewing", film.context],
    ["Year watched", film.watchedYear],
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/library" className="text-sm text-[var(--muted)] hover:text-[var(--primary)]">
        ← Back to library
      </Link>
      <div>
        <h1 className="text-3xl font-bold">{film.title}</h1>
        <p className="mt-1 text-[var(--muted)]">
          {film.director} · {film.year} · {film.country}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {film.rating != null && <span className="text-[var(--gold)]">★ {film.rating}</span>}
          {film.status === "Watchlist" && <Badge tone="watchlist">Watchlist</Badge>}
          <Badge tone="edition">{film.edition}</Badge>
          <Badge tone="place">{film.watchedAt}</Badge>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="mb-3 font-semibold">Viewing details</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[var(--muted)]">{label}</dt>
              <dd>{value || "-"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="mb-2 font-semibold">Review</h2>
        <p className="text-sm text-[var(--muted)]">{film.review || "No review yet."}</p>
      </div>

      <Select
        label="Add to a list"
        options={lists.map((l) => l.name)}
        placeholder="Choose a list"
        value=""
        onChange={(e) => {
          const list = lists.find((l) => l.name === e.target.value);
          if (list) addToList(list.id, film.id);
        }}
      />

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => toggleWatchlist(film.id)}>
          {film.status === "Watchlist" ? "Mark as watched" : "Move to watchlist"}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            removeFilm(film.id);
            router.push("/library");
          }}
        >
          Remove film
        </Button>
      </div>
    </div>
  );
}
