import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.section}>
      <Container className={styles.inner}>
        <SectionHeading align="left" eyebrow="About" title="About Aquajett Water Heaters Trading" />
        <RevealOnScroll className={styles.copy}>
          <p>
            Aquajett Water Heaters Trading was put up to supply your water heater needs in the South, Metro Manila,
            and nationwide.
          </p>
          <p>
            Aquajett supplies water heaters and provides delivery and installation services, helping homes get set
            up with reliable hot water.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
