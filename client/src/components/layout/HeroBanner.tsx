import { ReactNode } from 'react';

interface HeroBannerProps {
  backgroundImage?: string;
  children: ReactNode;
  overlay?: boolean;
  overlayOpacity?: string;
  className?: string;
  minHeight?: string;
}

export default function HeroBanner({
  backgroundImage,
  children,
  overlay = true,
  overlayOpacity = 'bg-black/50',
  className = '',
  minHeight = 'min-h-[70vh]'
}: HeroBannerProps) {
  return (
    <section
      className={`relative ${minHeight} flex items-end ${className}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      } : {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      }}
    >
      {/* Grayscale filter for the background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 grayscale"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
      )}
      {overlay && (
        <div className={`absolute inset-0 ${overlayOpacity}`} />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16 pt-32">
        {children}
      </div>
    </section>
  );
}
