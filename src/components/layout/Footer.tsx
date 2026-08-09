import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { FacebookIcon } from '../ui/FacebookIcon';
import { contactInfo, navItems } from '../../data/nav';
import logo from '../../assets/logo/secondary-logo.png';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logoBadge}>
              <img src={logo} alt="Aquajett Water Heaters" className={styles.logo} />
            </span>
            <p className={styles.tagline}>
              Supplying water heater needs in the South, Metro Manila, and nationwide.
            </p>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>Contact</h3>
            <ul className={styles.list}>
              <li>
                <a href={contactInfo.phoneHref} className={styles.link}>
                  <Phone size={16} aria-hidden="true" /> {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={contactInfo.mobileHref} className={styles.link}>
                  <Phone size={16} aria-hidden="true" /> {contactInfo.mobile}
                </a>
              </li>
              <li>
                <a href={contactInfo.emailHref} className={styles.link}>
                  <Mail size={16} aria-hidden="true" /> {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={contactInfo.facebook} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <FacebookIcon size={16} aria-hidden="true" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.heading}>Address</h3>
            <p className={styles.address}>
              <MapPin size={16} aria-hidden="true" className={styles.pin} />
              {contactInfo.address}
            </p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h3 className={styles.heading}>Navigate</h3>
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Aquajett Water Heaters Trading. All rights reserved.</span>
          <span>aquajettwaterheaters.com</span>
        </div>
      </Container>
    </footer>
  );
}
