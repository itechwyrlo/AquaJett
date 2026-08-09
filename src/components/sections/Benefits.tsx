import { Droplets, Home, Shield, Smile, Sparkles, ThermometerSun } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Benefits.module.css';

const benefits = [
  { icon: Droplets, title: 'Comfort', description: 'Warm water on demand, morning or night.' },
  { icon: ThermometerSun, title: 'Warmth', description: 'A steady, adjustable temperature for every routine.' },
  { icon: Sparkles, title: 'Cleanliness', description: 'Comfortable hot water for washing up and keeping a home fresh.' },
  { icon: Smile, title: 'Relaxation', description: 'A relaxing shower at the end of the day.' },
  { icon: Shield, title: 'Reliability', description: 'Automatic operation you can count on daily.' },
  { icon: Home, title: 'Home Confidence', description: 'Professional installation, done right.' },
];

export function Benefits() {
  return (
    <section className={styles.section} aria-label="Benefits of home hot water comfort">
      <Container>
        <SectionHeading eyebrow="Why It Matters" title="Feel the Comfort of Hot Water at Home" />
        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delayMs={index * 80} className={styles.item}>
              <benefit.icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
              <h3 className={styles.title}>{benefit.title}</h3>
              <p className={styles.description}>{benefit.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
