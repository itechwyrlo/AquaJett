import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileContactBar } from './components/layout/MobileContactBar';
import { Hero } from './components/hero/Hero';
import { ProductSection } from './components/products/ProductSection';
import { Benefits } from './components/sections/Benefits';
import { Features } from './components/sections/Features';
import { InstallationProcess } from './components/sections/InstallationProcess';
import { InstallationGallery } from './components/installations/InstallationGallery';
import { Coverage } from './components/sections/Coverage';
import { About } from './components/sections/About';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <ProductSection />
        <Benefits />
        <Features />
        <InstallationProcess />
        <InstallationGallery />
        <Coverage />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

export default App;
