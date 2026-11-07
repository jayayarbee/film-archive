"use client";

import { createContext, useContext, useMemo, useState } from "react";
import initialFilms from "../data/films";

const FilmContext = createContext(null);

const initialLists = [
  { id: 1, name: "Favourite world cinema", filmIds: [1, 3, 4] },
  { id: 2, name: "Films to revisit", filmIds: [2] },
];

const initialFilters = {
  search: "",
  director: "",
  country: "",
  decade: "",
  edition: "",
  watchedAt: "",
};

export function FilmProvider({ children }) {
  const [films, setFilms] = useState(initialFilms);
  const [lists, setLists] = useState(initialLists);
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      const search = filters.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        film.title.toLowerCase().includes(search) ||
        film.director.toLowerCase().includes(search);
      const matchesDirector = !filters.director || film.director === filters.director;
      const matchesCountry = !filters.country || film.country === filters.country;
      const decade = `${Math.floor(film.year / 10) * 10}s`;
      const matchesDecade = !filters.decade || decade === filters.decade;
      const matchesEdition = !filters.edition || film.edition === filters.edition;
      const matchesWatchedAt = !filters.watchedAt || film.watchedAt === filters.watchedAt;

      return (
        matchesSearch &&
        matchesDirector &&
        matchesCountry &&
        matchesDecade &&
        matchesEdition &&
        matchesWatchedAt
      );
    });
  }, [films, filters]);

  const addFilm = (film) => {
    setFilms((current) => [
      { ...film, id: Math.max(0, ...current.map((item) => item.id)) + 1 },
      ...current,
    ]);
  };

  const removeFilm = (id) => {
    setFilms((current) => current.filter((film) => film.id !== id));
    setLists((current) =>
      current.map((list) => ({
        ...list,
        filmIds: list.filmIds.filter((filmId) => filmId !== id),
      }))
    );
  };

  const toggleWatchlist = (id) => {
    setFilms((current) =>
      current.map((film) =>
        film.id === id
          ? {
              ...film,
              status: film.status === "Watchlist" ? "Watched" : "Watchlist",
            }
          : film
      )
    );
  };

  const createList = (name) => {
    setLists((current) => [
      ...current,
      { id: Math.max(0, ...current.map((list) => list.id)) + 1, name, filmIds: [] },
    ]);
  };

  const addToList = (listId, filmId) => {
    setLists((current) =>
      current.map((list) =>
        list.id === listId && !list.filmIds.includes(filmId)
          ? { ...list, filmIds: [...list.filmIds, filmId] }
          : list
      )
    );
  };

  const removeFromList = (listId, filmId) => {
    setLists((current) =>
      current.map((list) =>
        list.id === listId
          ? { ...list, filmIds: list.filmIds.filter((id) => id !== filmId) }
          : list
      )
    );
  };

  const watchedFilms = films.filter((film) => film.status !== "Watchlist");
  const ratedFilms = watchedFilms.filter((film) => typeof film.rating === "number");
  const countBy = (key) =>
    watchedFilms.reduce((result, film) => {
      const value = film[key] || "Unknown";
      result[value] = (result[value] || 0) + 1;
      return result;
    }, {});

  const stats = {
    totalWatched: watchedFilms.length,
    watchlistCount: films.filter((film) => film.status === "Watchlist").length,
    averageRating: ratedFilms.length
      ? (ratedFilms.reduce((sum, film) => sum + film.rating, 0) / ratedFilms.length).toFixed(1)
      : "—",
    byCountry: countBy("country"),
    byDecade: watchedFilms.reduce((result, film) => {
      const decade = `${Math.floor(film.year / 10) * 10}s`;
      result[decade] = (result[decade] || 0) + 1;
      return result;
    }, {}),
    byWatchedAt: countBy("watchedAt"),
  };

  const value = {
    films,
    lists,
    filters,
    filteredFilms,
    stats,
    updateFilter,
    resetFilters,
    addFilm,
    removeFilm,
    toggleWatchlist,
    createList,
    addToList,
    removeFromList,
  };

  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}

export function useFilms() {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error("useFilms must be used inside FilmProvider.");
  }
  return context;
}
