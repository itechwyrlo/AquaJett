import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '../../data/nav';
import styles from './MobileContactBar.module.css';

export function MobileContactBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="Quick contact">
      <a href={contactInfo.mobileHref} className={styles.action}>
        <Phone size={20} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a href={contactInfo.facebook} className={styles.action} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={20} aria-hidden="true" />
        <span>Message</span>
      </a>
      <a href={contactInfo.mapsHref} className={styles.action} target="_blank" rel="noopener noreferrer">
        <MapPin size={20} aria-hidden="true" />
        <span>Directions</span>
      </a>
    </div>
  );
}
