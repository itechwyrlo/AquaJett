import { MapPin } from 'lucide-react';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import type { Installation } from '../../data/installations';
import styles from './InstallationCard.module.css';

interface InstallationCardProps {
  installation: Installation;
  onOpen: () => void;
}

export function InstallationCard({ installation, onOpen }: InstallationCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.imageBox}>
        <ImagePlaceholder icon={MapPin} label={`Installation at ${installation.location}`} />
        <div className={styles.overlay}>
          <MapPin size={16} aria-hidden="true" />
          <span>
            {installation.location}
            <br />
            {installation.area}
          </span>
        </div>
      </div>
    </button>
  );
}
