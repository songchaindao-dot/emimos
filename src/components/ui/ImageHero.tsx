import { ReactNode } from "react";

interface ImageHeroProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  badge?: ReactNode;
  actions?: ReactNode;
  minHeightClass?: string;
  className?: string;
  imagePositionClass?: string;
}

const ImageHero = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  badge,
  actions,
  minHeightClass = "min-h-[280px]",
  className = "",
  imagePositionClass = "object-[50%_18%]",
}: ImageHeroProps) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden border border-border shadow-card ${minHeightClass} ${className}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="eager"
        decoding="sync"
        className={`absolute inset-0 w-full h-full object-cover ${imagePositionClass}`}
      />
      <div className="absolute inset-0 overlay-tint" />
      <div className={`relative z-10 p-6 md:p-8 h-full flex flex-col ${actions ? "justify-between" : "justify-end"}`}>
        {badge ? <div>{badge}</div> : <div />}
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-white/85 mt-3 max-w-xl">
            {subtitle}
          </p>
          {actions ? <div className="flex flex-wrap gap-3 mt-5">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
