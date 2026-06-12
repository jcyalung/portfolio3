import Section from "./Section";
import { SKILLS } from "../data/content";

const GROUPS = [
  { label: "Languages", key: "languages" as const },
  { label: "Frameworks", key: "frameworks" as const },
  { label: "Interests", key: "interests" as const },
];

export default function Skills() {
  return (
    <Section text="Skills" href="skills">
      {GROUPS.map(({ label, key }) => (
        <div key={key} className="mb-6">
          <h4 className="mb-0.5 font-serif text-2xl font-medium text-primary">
            {label}
          </h4>
          <p className="relative mb-3 text-lg text-zinc-600 dark:text-neutral">
            {SKILLS[key]}
          </p>
        </div>
      ))}
    </Section>
  );
}
