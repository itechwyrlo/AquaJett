import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import styles from './ProductComparison.module.css';

type Mode = 'singlepoint' | 'multipoint';

interface FixturePoint {
  x: number;
  y: number;
  label: string;
}

const FIXTURE_POINTS: Record<Mode, FixturePoint[]> = {
  singlepoint: [{ x: 250, y: 75, label: 'Shower' }],
  multipoint: [
    { x: 250, y: 20, label: 'Rain Shower' },
    { x: 250, y: 55, label: 'Teleshower' },
    { x: 250, y: 90, label: 'Faucet' },
    { x: 250, y: 125, label: 'Lavatory Sink' },
  ],
};

export function ProductComparison() {
  const [mode, setMode] = useState<Mode>('singlepoint');
  const points = FIXTURE_POINTS[mode];

  return (
    <RevealOnScroll className={styles.wrapper}>
      <SectionHeading
        align="left"
        eyebrow="Installation"
        title="Singlepoint or Multipoint"
        description="Either the Supreme or Extreme line can be set up either way — ask Aquajett which fits your home."
      />
      <div className={styles.card}>
        <div className={styles.tabs} role="tablist" aria-label="Singlepoint vs Multipoint installation">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'singlepoint'}
            className={`${styles.tab} ${mode === 'singlepoint' ? styles.tabActive : ''}`}
            onClick={() => setMode('singlepoint')}
          >
            Singlepoint
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'multipoint'}
            className={`${styles.tab} ${mode === 'multipoint' ? styles.tabActive : ''}`}
            onClick={() => setMode('multipoint')}
          >
            Multipoint
          </button>
        </div>

        <div className={styles.diagram}>
          <svg
            viewBox="0 0 360 150"
            className={styles.svg}
            role="img"
            aria-label={
              mode === 'singlepoint'
                ? 'One unit supplying one shower point'
                : 'One unit supplying the rain shower, teleshower, faucet, and lavatory sink'
            }
          >
            <rect x="20" y="50" width="50" height="50" rx="8" fill="var(--color-primary)" />
            {points.map((point) => (
              <g key={point.label}>
                <line
                  x1="70"
                  y1="75"
                  x2={point.x}
                  y2={point.y}
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="10 8"
                  className={styles.flowLine}
                />
                <circle cx={point.x} cy={point.y} r="7" fill="var(--color-accent)" />
                <text x={point.x + 14} y={point.y + 4} className={styles.label}>
                  {point.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <p className={styles.caption}>
          {mode === 'singlepoint'
            ? 'A Singlepoint installation supplies hot water to one fixture, such as a shower.'
            : 'A Multipoint installation can supply multiple fixtures — like the rain shower, teleshower, faucet, and lavatory sink — from a single unit.'}
        </p>
      </div>
    </RevealOnScroll>
  );
}
