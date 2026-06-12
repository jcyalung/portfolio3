"use client";

import { useExpression } from "./ExpressionContext";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/jcyalung",
    icon: (
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.555 0-.274-.01-1.001-.015-1.965-3.198.695-3.873-1.542-3.873-1.542-.523-1.33-1.277-1.683-1.277-1.683-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.693 1.25 3.35.956.103-.743.401-1.25.73-1.538-2.553-.29-5.238-1.277-5.238-5.683 0-1.256.448-2.282 1.184-3.087-.119-.29-.513-1.46.112-3.043 0 0 .966-.31 3.165 1.18a11.02 11.02 0 0 1 2.882-.388c.978.004 1.963.132 2.882.388 2.197-1.49 3.162-1.18 3.162-1.18.627 1.583.233 2.753.114 3.043.738.805 1.183 1.831 1.183 3.087 0 4.417-2.69 5.39-5.252 5.674.413.355.78 1.057.78 2.131 0 1.539-.014 2.781-.014 3.16 0 .308.207.667.79.554A11.503 11.503 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jcyal",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:jyalung1@uci.edu",
    icon: (
      <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 7.5L3.5 6h17L12 11.5Zm0 2.2L3 7.6V18h18V7.6l-9 6.1Z" />
    ),
  },
];

export default function Footer() {
  const { setHovered } = useExpression();

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row md:px-10">
        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-500">
          &copy; {new Date().getFullYear()}
        </p>

        <ul className="flex items-center gap-5">
          {LINKS.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  onPointerEnter={() => setHovered("happy1")}
                  onPointerLeave={() => setHovered(null)}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    {link.icon}
                  </svg>
                  <span className="font-sans text-sm">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
