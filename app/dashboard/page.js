"use client";

import StatCard from "../../components/StatCard";
import { useFilms } from "../../context/FilmContext";

function BarList({ title, data }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, n]) => n), 1);
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="mb-4 font-semibold">{title}</h2>
      {entries.length === 0 && <p className="text-sm text-[var(--muted)]">No data yet.</p>}
      <ul className="space-y-3">
        {entries.map(([label, n]) => (
          <li key={label} className="text-sm">
            <div className="mb-1 flex justify-between">
              <span>{label}</span>
              <span className="text-[var(--muted)]">{n}</span>
            </div>
            <div className="h-2 rounded bg-white/10">
              <div className="h-2 rounded bg-[var(--primary)]" style={{ width: `${(n / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  const { stats } = useFilms();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Films watched" value={stats.totalWatched} />
        <StatCard label="On watchlist" value={stats.watchlistCount} />
        <StatCard label="Average rating" value={stats.averageRating} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <BarList title="By country" data={stats.byCountry} />
        <BarList title="By decade" data={stats.byDecade} />
        <BarList title="Where watched" data={stats.byWatchedAt} />
      </div>
    </div>
  );
}
