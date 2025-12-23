import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-red-600"
          style={{
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="text-white space-y-8 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <img
                src="/8c3323cf-0943-47d7-a5aa-690896eb4221.png"
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 bg-red-600 rotate-45" />
                <div className="w-2 h-2 bg-red-600 rotate-45" />
                <div className="w-2 h-2 bg-red-600 rotate-45" />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-red-600 tracking-wider mb-2">
                  LE TOURNOI ULTIME
                </h2>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6">
                  <span className="text-red-600">GOAT</span>
                  <br />
                  225
                  <span className="text-xs text-red-600 font-bold align-bottom ml-1">1VS1</span>
                </h1>
              </div>

              <p className="text-xl font-bold text-gray-300 italic">
                "il n'en restera qu'un"
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#register"
                  className="bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 text-center"
                >
                  S'INSCRIRE MAINTENANT
                </a>
                <a
                  href="#about"
                  className="border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-slate-900 transition-all text-center"
                >
                  EN SAVOIR PLUS
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block lg:scale-150 xl:scale-175">
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-96 h-96">
              <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full" />
            </div>
            <img
              src="/9eee5fae-f9d2-417c-bfb8-4b0b96a3b12c.png"
              alt="Basketball GOAT"
              className="relative z-10 w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#competition" className="text-white hover:text-red-600 transition-colors">
          <ChevronDown size={40} />
        </a>
      </div>
    </section>
  );
}
