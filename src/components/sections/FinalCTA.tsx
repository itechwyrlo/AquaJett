import { MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { contactInfo } from '../../data/nav';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        <RevealOnScroll className={styles.content}>
          <h2 className={styles.heading}>Get the Right Water Heater for Your Home</h2>
          <p className={styles.description}>
            Contact Aquajett Water Heaters Trading for product information, delivery, and installation inquiries.
          </p>
          <div className={styles.actions}>
            <Button href={contactInfo.mobileHref} variant="dark" icon={<MessageCircle size={18} aria-hidden="true" />}>
              Talk to Aquajett
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
