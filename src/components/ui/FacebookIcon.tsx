interface FacebookIconProps {
  size?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * lucide-react (installed as a "logo-free" v1.x release) no longer ships brand
 * icons like Facebook. This is a small hand-drawn stand-in matching lucide's
 * stroke style (round joins/caps, currentColor) so it sits visually consistent
 * with every other icon on the site.
 */
export function FacebookIcon({ size = 24, className, ...rest }: FacebookIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3.6l.4-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
