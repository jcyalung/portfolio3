import Image from "next/image";
import Section from "./Section";
import { ABOUT, HERO } from "../data/content";

export default function About() {
  return (
    <Section text="About Me" href="about">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-8">
        <p className="w-auto whitespace-pre-line text-base text-zinc-600 md:pr-5 dark:text-neutral">
          {ABOUT.description}
        </p>
        <div className="h-80 w-64 shrink-0 rotate-[5deg] bg-white p-4 shadow-lg md:rotate-[7deg]">
          <Image
            className="h-full w-full object-cover"
            src={ABOUT.image}
            width={260}
            height={260}
            alt={HERO.name}
          />
        </div>
      </div>
    </Section>
  );
}
