const tones = {
  edition: "bg-[var(--primary)]/15 text-[var(--primary)]",
  place: "bg-sky-500/15 text-sky-300",
  watchlist: "bg-[var(--secondary)]/40 text-red-200",
  neutral: "bg-white/10 text-[var(--muted)]",
};

export default function Badge({ tone = "neutral", children }) {
  if (!children) return null;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
