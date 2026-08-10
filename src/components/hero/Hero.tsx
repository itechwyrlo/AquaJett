import { Droplet, MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { contactInfo } from '../../data/nav';
import heroVideo from '../../assets/images/hero/Hero.mp4';
import styles from './Hero.module.css';

export function Hero() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        <span className={styles.particle} />
        <span className={styles.particle} />
        <span className={styles.particle} />
      </div>

      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Aquajett Water Heaters Trading</span>
          <h1 className={styles.heading}>Feel the Warmth & Comfort.</h1>
          <p className={styles.description}>
            Reliable water heating for comfortable mornings, relaxing showers, and everyday living.
          </p>
          <div className={styles.actions}>
            <Button href="#products" variant="primary" showArrow>
              Find Your Water Heater
            </Button>
            <Button href={contactInfo.mobileHref} variant="secondary" icon={<MessageCircle size={18} aria-hidden="true" />}>
              Talk to Aquajett
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            {prefersReducedMotion ? (
              <ImagePlaceholder icon={Droplet} label="Aquajett water heater in a home bathroom" />
            ) : (
              <video
                className={styles.image}
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            )}
            <div className={styles.steam} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
