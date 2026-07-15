type Props = {
  images: string[];
  height?: string;
  reverse?: boolean;
};

export function ImageMarquee({ images, height = "h-72", reverse = false }: Props) {
  const loop = [...images, ...images];
  return (
    <div className={`relative w-full overflow-hidden ${height}`}>
      <div
        className={`flex h-full min-w-max gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: "60s" }}
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[4/5] h-full overflow-hidden rounded-2xl border border-white/10"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}
