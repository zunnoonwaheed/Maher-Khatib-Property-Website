import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Parse a numeric value out of the string, preserving prefix/suffix.
  const match = value.match(/^([^\d-]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const rawNumber = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = rawNumber ? Number(rawNumber.replace(/,/g, "")) : NaN;
  const hasDecimal = rawNumber.includes(".");
  const decimals = hasDecimal ? (rawNumber.split(".")[1]?.length ?? 0) : 0;

  useEffect(() => {
    if (!ref.current || Number.isNaN(target)) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    setDisplay(`${prefix}0${suffix}`);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            io.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = target * eased;
              const formatted = current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, target, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
