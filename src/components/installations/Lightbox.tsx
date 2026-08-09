import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import type { Installation } from '../../data/installations';
import styles from './Lightbox.module.css';

interface LightboxProps {
  installations: Installation[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ installations, activeIndex, onClose, onNavigate }: LightboxProps) {
  useLockBodyScroll(true);
  const installation = installations[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % installations.length);
      if (event.key === 'ArrowLeft') onNavigate((activeIndex - 1 + installations.length) % installations.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, installations.length, onClose, onNavigate]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`${installation.location} installation photo`}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <X size={24} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.nav} ${styles.prev}`}
        onClick={() => onNavigate((activeIndex - 1 + installations.length) % installations.length)}
        aria-label="Previous installation"
      >
        <ChevronLeft size={28} aria-hidden="true" />
      </button>

      <div className={styles.content}>
        <div className={styles.imageBox}>
          {installation.image ? (
            <img
              src={installation.image}
              alt={`Aquajett water heater installation at ${installation.location}`}
              className={styles.image}
            />
          ) : (
            <ImagePlaceholder icon={MapPin} label={`Installation at ${installation.location}`} />
          )}
        </div>
        <div className={styles.caption}>
          <h3>{installation.location}</h3>
          <p>{installation.area}</p>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.nav} ${styles.next}`}
        onClick={() => onNavigate((activeIndex + 1) % installations.length)}
        aria-label="Next installation"
      >
        <ChevronRight size={28} aria-hidden="true" />
      </button>
    </div>
  );
}
