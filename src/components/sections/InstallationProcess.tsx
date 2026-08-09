import { CheckCircle2, MessageSquare, PhoneCall, Sparkles, Truck } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './InstallationProcess.module.css';

const steps = [
  { icon: CheckCircle2, title: 'Choose', description: 'Pick the water heater that fits your home.' },
  { icon: PhoneCall, title: 'Contact', description: 'Reach out by call, message, or email.' },
  { icon: MessageSquare, title: 'Discuss', description: 'Talk through your setup and needs with Aquajett.' },
  { icon: Truck, title: 'Delivery & Installation', description: 'Your unit is delivered and installed.' },
  { icon: Sparkles, title: 'Enjoy', description: 'Comfortable hot water, ready when you are.' },
];

export function InstallationProcess() {
  const { ref, isVisible } = useScrollReveal<HTMLOListElement>();

  return (
    <section id="installation-process" className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Services" title="From Choice to Comfort" />
        <ol ref={ref} className={`${styles.steps} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.connector} aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step} style={{ transitionDelay: `${index * 120}ms` }}>
              <span className={styles.iconRing}>
                <step.icon size={22} aria-hidden="true" />
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
