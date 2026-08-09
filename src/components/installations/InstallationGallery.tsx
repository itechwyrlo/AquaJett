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
  const installationsWithImages = installations.filter((installation) => installation.image);

  return (
    <section id="gallery" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Real Aquajett Installations"
          description="A sample of homes and properties Aquajett has supplied and installed for."
        />
        <div className={styles.grid}>
          {installationsWithImages.map((installation, index) => (
            <RevealOnScroll key={installation.id} delayMs={(index % 4) * 70}>
              <InstallationCard installation={installation} onOpen={() => setActiveIndex(index)} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        <Lightbox
          installations={installationsWithImages}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
