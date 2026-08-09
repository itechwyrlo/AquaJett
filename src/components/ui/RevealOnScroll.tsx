import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale';
  delayMs?: number;
}

export function RevealOnScroll({ children, className, variant = 'up', delayMs = 0 }: RevealOnScrollProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const revealClass = variant === 'scale' ? 'reveal-scale' : 'reveal';
  const classes = [revealClass, isVisible ? 'reveal-visible' : '', className].filter(Boolean).join(' ');
  const style: CSSProperties | undefined = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
