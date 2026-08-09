import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';

interface ButtonProps {
  variant?: Variant;
  showArrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  showArrow = false,
  icon,
  children,
  className,
  href,
  target,
  rel,
  type = 'button',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow && (
        <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
