import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from './ProductCard';
import { ProductComparison } from './ProductComparison';
import { productLines } from '../../data/products';
import styles from './ProductSection.module.css';

export function ProductSection() {
  return (
    <section id="products" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Water Heating Solutions"
          description="Choose the model built for how your home uses hot water."
        />

        <div className={styles.grid}>
          {productLines.map((line, index) => (
            <ProductCard key={line.id} line={line} delayMs={index * 100} />
          ))}
        </div>

        <ProductComparison />
      </Container>
    </section>
  );
}
