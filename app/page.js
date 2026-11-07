"use client";

import Link from "next/link";
import FilmCard from "../components/FilmCard";
import { useFilms } from "../context/FilmContext";

const features = [
  { title: "Log every film", text: "Rate, review and keep notes on everything you watch." },
  { title: "Edition and viewing details", text: "Record the edition you watched, where you watched it, and whether it was a rewatch." },
  { title: "Your own archive", text: "Private lists, a watchlist and stats by director, country and decade." },
];

export default function Home() {
  const { films } = useFilms();

  return (
    <div className="space-y-16">
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Your personal <span className="text-[var(--primary)]">film archive</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
          A private place for arthouse and world-cinema lovers to keep track of
          what they watched, which edition they watched, and where.
        </p>
        <Link
          href="/library"
          className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-black hover:opacity-90"
        >
          Open your library
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{f.text}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">A peek inside</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {films.slice(0, 3).map((f) => (
            <FilmCard key={f.id} film={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
