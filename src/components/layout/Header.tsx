import { useEffect, useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileMenu } from '../navigation/MobileMenu';
import { navItems, contactInfo } from '../../data/nav';
import logo from '../../assets/logo/primary-logo.png';
import styles from './Header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.logoLink} aria-label="Aquajett Water Heaters home">
          <img src={logo} alt="Aquajett Water Heaters" className={styles.logo} />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button
            href={contactInfo.mobileHref}
            variant="primary"
            icon={<Phone size={16} aria-hidden="true" />}
            className={styles.desktopCta}
          >
            Contact Us
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
