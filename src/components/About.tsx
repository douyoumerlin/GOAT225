import { Target, Calendar, Trophy, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Célébrer la culture urbaine et l\'excellence individuelle à travers le duel 1vs1',
    },
    {
      icon: Calendar,
      title: 'Juin 2025',
      description: 'Période stratégique pendant les vacances scolaires pour mobiliser la communauté',
    },
    {
      icon: Trophy,
      title: 'Compétition',
      description: 'Le un contre un remis au centre du terrain pour valoriser les talents',
    },
    {
      icon: Zap,
      title: 'Spectacle Total',
      description: 'Une fusion parfaite entre sport de haut niveau et divertissement',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            LE <span className="text-red-600">GOAT 225 1VS1</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bien plus qu'un simple tournoi de basket-ball, c'est une célébration de la culture urbaine
            et de l'excellence individuelle. Dans un paysage sportif où le jeu collectif prime souvent,
            nous remettons au centre du terrain l'essence même de la compétitivité : <span className="font-bold text-slate-900">le duel</span>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-50 p-8 hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-2"
            >
              <feature.icon className="w-12 h-12 text-red-600 group-hover:text-white mb-4 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-6">Notre Promesse</h3>
            <p className="text-xl leading-relaxed max-w-3xl">
              Offrir un <span className="text-red-600 font-bold">spectacle total</span> où sport et
              divertissement ne font qu'un. Une plateforme unique pour les marques souhaitant toucher
              une cible jeune, dynamique et passionnée.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
