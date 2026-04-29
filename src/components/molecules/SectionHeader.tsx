interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  titleClassName = "",
  subtitleClassName = "",
  className = "",
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      <h2
        className={`font-montserrat font-semibold italic text-section-title text-text-primary dark:text-brand-white leading-tight text-balance ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-montserrat font-extralight text-body-lg text-text-primary/70 dark:text-brand-white/60 max-w-2xl text-balance ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
