import Hero from "./components/Hero";
import EmojiScene from "./components/EmojiScene";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-6 md:px-10">
        <Hero />
      </main>
      {/* Anchored near the bottom so the centered face lands at ~75% of the viewport. */}
      <div className="mt-auto h-[49vh] w-full">
        <EmojiScene />
      </div>
      <p className="text-base text-center font-normal text-zinc-600 md:text-lg dark:text-neutral mb-[1vh]">Click me ^</p>
    </div>
  );
}
