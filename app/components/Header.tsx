"use client";

import Link from "next/link";
import Image from "next/image";
import { useExpression } from "./ExpressionContext";

const NAV_LINKS = [
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "skills", href: "/skills" },
  { label: "about", href: "/about" },
];

export default function Header() {
  const { setHovered } = useExpression();
  const happy = () => setHovered("happy1");
  const clear = () => setHovered(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3 md:px-10">
        <Link
          href="/"
          aria-label="Home"
          onPointerEnter={happy}
          onPointerLeave={clear}
          className="block shrink-0 rounded-full ring-1 ring-zinc-300 transition-transform hover:scale-105 dark:ring-zinc-700"
        >
          <Image
            src="/josh-small.png"
            alt="Profile"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full object-cover"
          />
        </Link>

        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 font-sans text-sm sm:gap-x-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onPointerEnter={happy}
                onPointerLeave={clear}
                className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
