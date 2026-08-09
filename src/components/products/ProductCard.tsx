import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import type { ProductLine } from '../../data/products';
import { contactInfo } from '../../data/nav';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  line: ProductLine;
  delayMs?: number;
}

export function ProductCard({ line, delayMs = 0 }: ProductCardProps) {
  const [versionId, setVersionId] = useState(line.versions[0].id);

  const version = line.versions.find((candidate) => candidate.id === versionId) ?? line.versions[0];

  return (
    <RevealOnScroll delayMs={delayMs} className={styles.wrapper}>
      <article className={styles.card}>
        <div className={styles.imageBox}>
          <img
            src={version.image}
            alt={`${line.name} ${version.label} water heater`}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.name}>{line.name}</h3>
          <p className={styles.use}>{line.intendedUse}</p>

          {line.versions.length > 1 && (
            <div className={styles.versionRow} role="tablist" aria-label={`${line.name} version`}>
              {line.versions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={option.id === version.id}
                  className={`${styles.versionTab} ${option.id === version.id ? styles.versionTabActive : ''}`}
                  onClick={() => setVersionId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <p className={styles.details}>{version.details}</p>

          <a
            className={styles.cta}
            href={contactInfo.mobileHref}
            aria-label={`Ask about the ${line.name} ${version.label}`}
          >
            Ask About This Model
            <ArrowRight size={16} className={styles.ctaArrow} aria-hidden="true" />
          </a>
        </div>
      </article>
    </RevealOnScroll>
  );
}
