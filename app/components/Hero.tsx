import { HERO } from "../data/content";

export default function Hero() {
  const { name, specialty, summary } = HERO;

  return (
    <section id="hero" className="py-8 md:py-10">
      <h1 className="mb-1.5 font-serif text-5xl font-bold tracking-tightest text-zinc-900 sm:text-6xl md:mb-0 md:text-7xl dark:text-white">
        {name}
      </h1>
      <p className="mb-5 font-serif text-3xl leading-tight font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
        {specialty}
      </p>
      <p className="text-base font-normal text-zinc-600 md:text-lg dark:text-neutral">
        {summary}
      </p>
    </section>
  );
}
