"use client";

import { useState } from "react";
import Button from "./Button";
import { Input, Select } from "./Input";
import { useFilms } from "../context/FilmContext";
import { editions, places, contexts } from "../data/options";

const blank = {
  title: "", director: "", country: "", year: "", rating: "",
  edition: "", watchedAt: "", context: "", review: "",
};

export default function AddFilmModal({ onClose }) {
  const { addFilm } = useFilms();
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.director.trim() || !form.year) {
      setError("Title, director and year are required.");
      return;
    }
    addFilm({
      ...form,
      year: Number(form.year),
      rating: form.rating ? Number(form.rating) : null,
      status: "Watched",
      watchedYear: new Date().getFullYear(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <h2 className="text-2xl font-semibold">Add a film</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Title" value={form.title} onChange={set("title")} />
          <Input label="Director" value={form.director} onChange={set("director")} />
          <Input label="Country" value={form.country} onChange={set("country")} />
          <Input label="Year" type="number" value={form.year} onChange={set("year")} />
          <Input label="Rating (0-5)" type="number" step="0.5" min="0" max="5" value={form.rating} onChange={set("rating")} />
          <Select label="Edition" options={editions} placeholder="Select" value={form.edition} onChange={set("edition")} />
          <Select label="Where you watched" options={places} placeholder="Select" value={form.watchedAt} onChange={set("watchedAt")} />
          <Select label="Viewing" options={contexts} placeholder="Select" value={form.context} onChange={set("context")} />
        </div>
        <label className="block text-sm text-[var(--muted)]">
          Short review
          <textarea
            rows={3}
            value={form.review}
            onChange={set("review")}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
          />
        </label>
        {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add to archive</Button>
        </div>
      </form>
    </div>
  );
}
