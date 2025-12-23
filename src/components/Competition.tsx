import { Users, Award, Flame } from 'lucide-react';

export default function Competition() {
  const categories = [
    {
      icon: Users,
      title: 'Catégorie junior',
      participants: '32 joueurs',
      prize: 'Gain du vainqueur : 1M',
      description: 'Les meilleurs jeunes talents locaux s\'affrontent dans des duels intenses',
      color: 'bg-red-600',
    },
    {
      icon: Award,
      title: 'Catégorie sénior',
      participants: '32 joueurs',
      prize: 'Gain du vainqueur : 2M',
      description: 'Les joueurs remplis d\'expériences nous ferons vivre des duels d\'anthologie',
      color: 'bg-slate-900',
    },
  ];

  return (
    <section id="competition" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Flame className="text-red-600" size={32} />
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
              LA COMPÉTITION
            </h2>
            <Flame className="text-red-600" size={32} />
          </div>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            64 joueurs répartis en deux catégories d'élite pour déterminer qui est le véritable GOAT
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`${category.color} p-8 text-white`}>
                <category.icon className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-black mb-2">{category.title}</h3>
                <p className="text-lg font-bold opacity-90">{category.participants}</p>
                <p className="text-base font-semibold opacity-80 mt-2">{category.prize}</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-red-600/20 rounded-full blur-2xl" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-red-600/20 rounded-full blur-2xl" />
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-black mb-6">Format du Tournoi</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">1VS1</div>
                <p className="text-gray-300">Regles USA</p>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">32</div>
                <p className="text-gray-300">Joueurs par catégorie</p>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">64</div>
                <p className="text-gray-300">Joueurs totaux</p>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">1</div>
                <p className="text-gray-300">Champion GOAT par catégorie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
