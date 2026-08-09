import { MapPin } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Coverage.module.css';

const areas = ['South', 'Metro Manila', 'Nationwide (product supply)'];

export function Coverage() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading
          align="left"
          eyebrow="Coverage"
          title="Serving Homes Across the Philippines"
          description="Supplying water heater needs in the South, Metro Manila, and nationwide."
        />
        <RevealOnScroll className={styles.list}>
          {areas.map((area) => (
            <div key={area} className={styles.item}>
              <MapPin size={18} aria-hidden="true" />
              <span>{area}</span>
            </div>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
