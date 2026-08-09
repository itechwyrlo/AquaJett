import type { LucideIcon } from 'lucide-react';
import { Droplet } from 'lucide-react';
import styles from './ImagePlaceholder.module.css';

interface ImagePlaceholderProps {
  icon?: LucideIcon;
  label: string;
  className?: string;
}

export function ImagePlaceholder({ icon: Icon = Droplet, label, className }: ImagePlaceholderProps) {
  return (
    <div
      className={[styles.placeholder, className].filter(Boolean).join(' ')}
      data-placeholder="true"
      role="img"
      aria-label={label}
    >
      <Icon className={styles.icon} strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}
