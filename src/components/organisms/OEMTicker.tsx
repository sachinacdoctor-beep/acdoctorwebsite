import { OEM_BRANDS } from "@/lib/data";

export function OEMTicker() {
  // Double the array for seamless looping
  const doubled = [...OEM_BRANDS, ...OEM_BRANDS, ...OEM_BRANDS];

  return (
    <div
      className="w-full overflow-hidden py-8 bg-white dark:bg-white/5 border-y border-black/5 dark:border-white/10"
      aria-label="Supported AC brands"
    >
      <div
        className="flex gap-12 items-center w-max animate-scroll will-change-transform"
        style={{ animation: "scroll 25s linear infinite" }}
      >
        {doubled.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="font-montserrat font-bold text-xl md:text-2xl text-text-primary/30 dark:text-brand-white/30 tracking-widest uppercase whitespace-nowrap hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-300"
            aria-hidden={i >= OEM_BRANDS.length ? "true" : undefined}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
