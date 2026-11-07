"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/library", label: "Library" },
  { href: "/lists", label: "Lists" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-[var(--border)] bg-[var(--surface)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-[var(--primary)]">
          Film Archive
        </Link>
        <button
          className="text-sm md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
        <ul className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-3 bg-[var(--surface)] p-4 md:static md:flex md:w-auto md:flex-row md:p-0`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${
                  pathname.startsWith(l.href)
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
