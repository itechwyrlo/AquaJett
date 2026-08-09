import { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { InstallationCard } from './InstallationCard';
import { Lightbox } from './Lightbox';
import { installations } from '../../data/installations';
import styles from './InstallationGallery.module.css';

export function InstallationGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Real Aquajett Installations"
          description="A sample of homes and properties Aquajett has supplied and installed for."
        />
        <div className={styles.grid}>
          {installations.map((installation, index) => (
            <RevealOnScroll key={installation.id} delayMs={(index % 4) * 70}>
              <InstallationCard installation={installation} onOpen={() => setActiveIndex(index)} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        <Lightbox
          installations={installations}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
