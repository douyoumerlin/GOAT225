import { Users, Calendar, Trophy, DollarSign } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Users,
      number: '74',
      label: 'Athlètes',
      description: 'Talents d\'élite',
    },
    {
      icon: DollarSign,
      number: '+4M',
      label: 'FCFA',
      description: 'Cash Prize',
    },
    {
      icon: Users,
      number: '+500',
      label: 'Spectateurs',
      description: 'Attendus',
    },
    {
      icon: Users,
      number: '+100',
      label: 'Personnes en ligne',
      description: 'Connectées',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            EN <span className="text-red-600">CHIFFRES</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full group-hover:bg-white group-hover:text-red-600 transition-colors">
                <stat.icon size={32} />
              </div>
              <div className="text-5xl font-black text-red-600 mb-2">{stat.number}</div>
              <div className="text-xl font-bold mb-1">{stat.label}</div>
              <div className="text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
