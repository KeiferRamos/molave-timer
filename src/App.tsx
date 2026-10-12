import { useEffect, useState } from "react";
import heroBg from "./images/Cream Pastel Leaves Aesthetic Group Project Presentation.png";

function nextHour(from: number) {
  const d = new Date(from);
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return d.getTime();
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function App() {
  const [target, setTarget] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (target === null) return;
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, [target]);

  const start = () => {
    const t = nextHour(Date.now());
    setRemaining(t - Date.now());
    setTarget(t);
  };

  const running = target !== null;
  const done = running && remaining === 0;
  const total = Math.ceil(remaining / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const label = running
    ? new Date(target).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <main
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover" }}
      className="min-h-screen flex items-center justify-center p-6 font-sans text-neutral-900"
    >
      {!running ? (
        <button
          onClick={start}
          className="group flex flex-col items-center gap-5 cursor-pointer"
        >
          <span className="size-28 rounded-full bg-neutral-900 text-white grid place-items-center transition group-hover:scale-105 group-active:scale-95 group-focus-visible:ring-4 ring-neutral-300">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-500">
            Start timer
          </span>
        </button>
      ) : (
        <section className="flex flex-col items-center gap-8 text-center">
          {done ? (
            <h1 className="font-display font-light  leading-none">{label}</h1>
          ) : (
            <h1 className="font-display leading-none" aria-live="off">
              {h > 0 && <>{h}:</>}
              {pad(m)}
              <span className="text-neutral-300">:</span>
              {pad(s)}
            </h1>
          )}
          <p>1 Cor 14:40</p>
        </section>
      )}
    </main>
  );
}
