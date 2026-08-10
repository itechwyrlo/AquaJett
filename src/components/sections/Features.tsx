import { Gauge, Sliders, ThermometerSnowflake, ThermometerSun } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './Features.module.css';

const features = [
  { icon: Gauge, title: 'Fully Automatic Operation', description: 'Runs automatically once installed and set.' },
  { icon: Sliders, title: 'Min–Max Temperature Selector', description: 'Dial in exactly the temperature you want.' },
  { icon: ThermometerSnowflake, title: 'Temperature Indicator', description: 'See the current temperature setting at a glance.' },
  { icon: ThermometerSun, title: 'Set Your Desired Temperature', description: 'Comfortable hot water, tuned to your preference.' },
];

export function Features() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Built In"
          title="Every Aquajett Unit Includes"
          description="The Instantaneous Water Heaters build on this foundation with additional features of their own, detailed above."
        />
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delayMs={index * 60} className={styles.card}>
              <feature.icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
