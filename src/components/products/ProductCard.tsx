import { useMemo, useState, type CSSProperties } from 'react';
import { ArrowRight, Check } from 'lucide-react';
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

  const version = useMemo(
    () => line.versions.find((candidate) => candidate.id === versionId) ?? line.versions[0],
    [line.versions, versionId],
  );

  const [colorId, setColorId] = useState(version.colors[0].id);

  const color = useMemo(
    () => version.colors.find((candidate) => candidate.id === colorId) ?? version.colors[0],
    [version.colors, colorId],
  );

  function handleVersionChange(nextVersionId: string) {
    setVersionId(nextVersionId);
    const nextVersion = line.versions.find((candidate) => candidate.id === nextVersionId);
    if (nextVersion) setColorId(nextVersion.colors[0].id);
  }

  return (
    <RevealOnScroll delayMs={delayMs} className={styles.wrapper}>
      <article className={styles.card}>
        <div className={styles.imageBox}>
          <img
            src={color.image}
            alt={`${line.name} ${version.label} water heater in ${color.label}, installed`}
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
                  onClick={() => handleVersionChange(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {version.colors.length > 1 && (
            <div className={styles.colorRow} role="radiogroup" aria-label={`${line.name} ${version.label} color`}>
              {version.colors.map((option) => {
                const isSelected = option.id === color.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option.label}
                    title={option.label}
                    className={`${styles.swatch} ${isSelected ? styles.swatchActive : ''}`}
                    style={
                      {
                        backgroundColor: option.swatchColor,
                        '--swatch-check-color': option.checkColor,
                      } as CSSProperties
                    }
                    onClick={() => setColorId(option.id)}
                  >
                    {isSelected && <Check size={14} className={styles.swatchCheck} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          )}

          <ul className={styles.features}>
            {line.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <a
            className={styles.cta}
            href={contactInfo.mobileHref}
            aria-label={`Ask about the ${line.name} ${version.label} in ${color.label}`}
          >
            Ask About This Model
            <ArrowRight size={16} className={styles.ctaArrow} aria-hidden="true" />
          </a>
        </div>
      </article>
    </RevealOnScroll>
  );
}
