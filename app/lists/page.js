"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import { Input, Select } from "../../components/Input";
import { useFilms } from "../../context/FilmContext";

export default function ListsPage() {
  const { films, lists, createList, addToList, removeFromList } = useFilms();
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createList(name.trim());
    setName("");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Lists</h1>

      <form onSubmit={submit} className="flex max-w-md items-end gap-3">
        <div className="flex-1">
          <Input label="New list name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <Button type="submit">Create</Button>
      </form>

      {lists.length === 0 ? (
        <EmptyState title="No lists yet" message="Create your first list above." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {lists.map((list) => {
            const listFilms = list.filmIds
              .map((fid) => films.find((f) => f.id === fid))
              .filter(Boolean);
            return (
              <div key={list.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <h2 className="text-lg font-semibold">
                  {list.name} <span className="text-sm text-[var(--muted)]">({listFilms.length})</span>
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {listFilms.length === 0 && <li className="text-[var(--muted)]">Empty list</li>}
                  {listFilms.map((f) => (
                    <li key={f.id} className="flex items-center justify-between">
                      <Link href={`/film/${f.id}`} className="hover:text-[var(--primary)]">{f.title}</Link>
                      <button onClick={() => removeFromList(list.id, f.id)} className="text-xs text-[var(--muted)] hover:text-[var(--error)]">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Select
                    label="Add film"
                    placeholder="Choose a film"
                    options={films.filter((f) => !list.filmIds.includes(f.id)).map((f) => f.title)}
                    value=""
                    onChange={(e) => {
                      const film = films.find((f) => f.title === e.target.value);
                      if (film) addToList(list.id, film.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
