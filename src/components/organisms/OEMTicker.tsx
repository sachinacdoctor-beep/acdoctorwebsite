import { OEM_BRANDS } from "@/lib/data";

export function OEMTicker() {
  // Duplicate brands for seamless infinite scrolling.
  const doubled = [...OEM_BRANDS, ...OEM_BRANDS, ...OEM_BRANDS];

  return (
    <div
      className="w-full overflow-hidden py-[12px] md:py-8 bg-white border-y border-black/5"
      aria-label="Supported AC brands"
    >
      <div
        className="flex gap-6 md:gap-12 items-center w-max oem-scroll will-change-transform"
        style={{ animation: "oem-scroll 25s linear infinite" }}
      >
        {doubled.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="font-montserrat font-bold text-sm md:text-2xl text-[#0b73bb] md:text-text-primary/30 tracking-widest uppercase whitespace-nowrap hover:text-brand-primary"
            aria-hidden={i >= OEM_BRANDS.length ? "true" : undefined}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
