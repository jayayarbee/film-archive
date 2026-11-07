const styles = {
  primary: "bg-[var(--primary)] text-black hover:opacity-90",
  secondary: "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)]",
  danger: "bg-[var(--error)] text-white hover:opacity-90",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
