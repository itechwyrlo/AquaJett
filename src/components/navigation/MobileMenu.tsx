import { useEffect, useRef } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { contactInfo, navItems } from '../../data/nav';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      className={`${styles.panel} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
    >
      <div className={styles.header}>
        <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={onClose} aria-label="Close menu">
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li
            key={item.href}
            className={styles.navItem}
            style={{ transitionDelay: isOpen ? `${80 + index * 60}ms` : '0ms' }}
          >
            <a href={item.href} className={styles.navLink} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.contact}>
        <a href={contactInfo.mobileHref} className={styles.contactLink}>
          <Phone size={18} aria-hidden="true" /> {contactInfo.mobile}
        </a>
        <a href={contactInfo.emailHref} className={styles.contactLink}>
          <Mail size={18} aria-hidden="true" /> {contactInfo.email}
        </a>
      </div>
    </div>
  );
}
