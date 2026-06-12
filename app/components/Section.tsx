import type { ReactNode } from "react";

interface SectionProps {
  text: string;
  href: string;
  children: ReactNode;
}

export default function Section({ text, href, children }: SectionProps) {
  return (
    <section id={href} className="py-24">
      <h2 className="mb-14 font-serif text-4xl font-bold tracking-tighter text-zinc-900 md:text-5xl dark:text-white">
        {text}
      </h2>
      {children}
    </section>
  );
}
