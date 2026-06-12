import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <div className="flex-1 bg-zinc-50 px-6 font-sans dark:bg-black md:px-10">
      <main className="mx-auto w-full max-w-3xl">
        <Projects />
      </main>
    </div>
  );
}
