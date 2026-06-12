import Section from "./Section";
import { EXPERIENCE } from "../data/content";

export default function Experience() {
  return (
    <Section text="Work Experience" href="experience">
      {EXPERIENCE.map(({ company, position, startDate, endDate, summary }) => (
        <div key={`${company}-${position}`} className="mb-10">
          <h3 className="mb-1.5 font-serif text-2xl font-semibold text-zinc-900 dark:text-white">
            {company}
          </h3>
          <div className="flex flex-col items-start pb-5">
            <h4 className="mb-0.5 font-serif text-2xl font-medium text-primary">
              {position}
            </h4>
            <span className="pb-[2px] text-sm text-zinc-500 dark:text-white/70">
              {startDate} {endDate ? `- ${endDate}` : null}
            </span>
          </div>
          {Array.isArray(summary) ? (
            <ul className="list-none">
              {summary.map((log, index) => (
                <li
                  key={index}
                  className="relative mb-3 pl-8 text-base text-zinc-600 before:absolute before:top-1 before:left-0 before:content-[url(/check.svg)] dark:text-neutral"
                >
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-zinc-600 dark:text-neutral">{summary}</p>
          )}
        </div>
      ))}
    </Section>
  );
}
