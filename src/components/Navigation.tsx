import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  scrolled: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Compétition', href: '#competition' },
    { label: 'Concours', href: '#contests' },
    { label: 'Partenaires', href: '#partners' },
    { label: 'À Propos', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              <span className="text-red-600">GOAT</span> 225
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-red-600 transition-colors font-medium text-sm tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#register"
              className="bg-red-600 text-white px-6 py-2.5 font-bold text-sm tracking-wide hover:bg-red-700 transition-all transform hover:scale-105"
            >
              S'INSCRIRE
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white hover:text-red-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#register"
              className="block text-center bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              S'INSCRIRE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
