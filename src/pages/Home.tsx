import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Competition from '../components/Competition';
import Contests from '../components/Contests';
import Stats from '../components/Stats';
import Partners from '../components/Partners';
import Registration from '../components/Registration';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled={scrolled} />
      <Hero />
      <Competition />
      <Registration />
      <Contests />
      <Stats />
      <Partners />
      <About />
      <Footer />
    </div>
  );
}
