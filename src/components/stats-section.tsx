import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 500, suffix: "+", label: "Homes Sold" },
  { value: 98, suffix: "%", label: "List-to-Sale" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 150, prefix: "$", suffix: "M+", label: "In Sales" },
];

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
}

function Counter({ stat, active }: { stat: (typeof STATS)[number]; active: boolean }) {
  const n = useCountUp(stat.value, active);
  return (
    <div className="text-center">
      <div className="font-serif text-6xl font-medium tracking-tight text-black sm:text-7xl lg:text-[6rem]">
        {stat.prefix ?? ""}
        {n}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-black/60">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4">
          {STATS.map((s) => (
            <Counter key={s.label} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
