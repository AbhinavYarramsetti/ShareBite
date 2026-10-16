import React, { useId } from 'react';

export interface LogoProps {
  size?: number;
  className?: string;
  /** Accessible label; pass '' when the mark sits next to the wordmark already. */
  label?: string;
}

/**
 * ShareBite brand mark — "the shared plate".
 *
 * One form carrying the whole idea: a plate with a bite taken out of it
 * (surplus food, already part-served), a heart at the centre (the meal passed
 * on to someone who needs it), and a leaf sprouting behind it (food kept out
 * of landfill). Drawn as geometry so it stays crisp from favicon to hero size.
 */
export const Logo: React.FC<LogoProps> = ({ size = 34, className = '', label = 'ShareBite' }) => {
  // useId() contains colons, which are invalid inside a url(#…) reference.
  const gradientId = `sharebite-plate-${useId().replace(/:/g, '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="5" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#377357" />
          <stop offset="100%" stopColor="#173D2B" />
        </linearGradient>
      </defs>

      {/* Leaf sprouting from behind the plate */}
      <path d="M5.9 2.4c4.6.4 7.9 3 8.7 7-4.5-.2-7.8-2.9-8.7-7Z" fill="#7FA58A" />
      <path
        d="M6.9 3.5c3.1 1.4 5.4 3.3 7 6"
        stroke="#EBF2ED"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />

      {/* The plate, with a bite taken from the top-right edge */}
      <path
        d="M20.19 6.83A11 11 0 1 0 26.95 15.98A7.5 7.5 0 0 1 20.19 6.83Z"
        fill={`url(#${gradientId})`}
      />

      {/* The meal that gets passed on */}
      <path
        d="M16 23.1c-.3 0-5.9-3.6-5.9-7.6 0-2 1.5-3.5 3.3-3.5 1.1 0 2 .5 2.6 1.4.6-.9 1.5-1.4 2.6-1.4 1.8 0 3.3 1.5 3.3 3.5 0 4-5.6 7.6-5.9 7.6Z"
        fill="#F7F5EF"
      />

      {/* A crumb, caught mid-share */}
      <circle cx="29.4" cy="17.8" r="1.1" fill="#7FA58A" />
    </svg>
  );
};

/** Mark plus wordmark, used in the header and footer. */
export const LogoLockup: React.FC<{ size?: number; className?: string }> = ({
  size = 34,
  className = '',
}) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <Logo size={size} label="" />
    <span className="text-xl font-bold tracking-tight text-primary-dark">
      Share<span className="text-primary">Bite</span>
    </span>
  </span>
);
