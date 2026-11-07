export default function EmptyState({ title, message, children }) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
