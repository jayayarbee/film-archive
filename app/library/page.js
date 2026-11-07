"use client";

import { useState } from "react";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import FilmCard from "../../components/FilmCard";
import AddFilmModal from "../../components/AddFilmModal";
import { Input, Select } from "../../components/Input";
import { useFilms } from "../../context/FilmContext";

const unique = (arr) => [...new Set(arr.filter(Boolean))].sort();

export default function LibraryPage() {
  const { films, filteredFilms, filters, updateFilter, resetFilters } = useFilms();
  const [showModal, setShowModal] = useState(false);

  const decades = unique(films.map((f) => Math.floor(f.year / 10) * 10 + "s"));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Library</h1>
        <Button onClick={() => setShowModal(true)}>Add film</Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Search"
          placeholder="Title or director"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
        <Select label="Director" options={unique(films.map((f) => f.director))} value={filters.director} onChange={(e) => updateFilter("director", e.target.value)} />
        <Select label="Country" options={unique(films.map((f) => f.country))} value={filters.country} onChange={(e) => updateFilter("country", e.target.value)} />
        <Select label="Decade" options={decades} value={filters.decade} onChange={(e) => updateFilter("decade", e.target.value)} />
        <Select label="Edition" options={unique(films.map((f) => f.edition))} value={filters.edition} onChange={(e) => updateFilter("edition", e.target.value)} />
        <Select label="Where watched" options={unique(films.map((f) => f.watchedAt))} value={filters.watchedAt} onChange={(e) => updateFilter("watchedAt", e.target.value)} />
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-[var(--muted)]">
        <span>{filteredFilms.length} films</span>
        <button onClick={resetFilters} className="hover:text-[var(--primary)]">Clear filters</button>
      </div>

      {filteredFilms.length === 0 ? (
        <EmptyState title="No films found" message="Try changing or clearing your filters.">
          <Button variant="secondary" onClick={resetFilters}>Clear filters</Button>
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFilms.map((f) => (
            <FilmCard key={f.id} film={f} />
          ))}
        </div>
      )}

      {showModal && <AddFilmModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
