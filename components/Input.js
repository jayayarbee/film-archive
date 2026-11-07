const field =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]";

export function Input({ label, ...props }) {
  return (
    <label className="block text-sm text-[var(--muted)]">
      {label}
      <input className={`${field} mt-1`} {...props} />
    </label>
  );
}

export function Select({ label, options, placeholder = "All", ...props }) {
  return (
    <label className="block text-sm text-[var(--muted)]">
      {label}
      <select className={`${field} mt-1`} {...props}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
