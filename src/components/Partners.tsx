import { useState } from 'react';
import { Handshake, TrendingUp, Users, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Partners() {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const benefits = [
    {
      icon: Users,
      title: 'Cible Jeune & Dynamique',
      description: 'Accédez à une audience passionnée et engagée',
    },
    {
      icon: TrendingUp,
      title: 'Visibilité Maximale',
      description: 'Communication digitale agressive et présence événementielle',
    },
    {
      icon: Star,
      title: 'Association Premium',
      description: 'Liez votre marque à l\'excellence et la culture urbaine',
    },
    {
      icon: Handshake,
      title: 'Partenariat Sur-Mesure',
      description: 'Solutions adaptées à vos objectifs marketing',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('partner_inquiries')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        company_name: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            DEVENEZ <span className="text-red-600">PARTENAIRE</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Le GOAT 225 1vs1 offre une plateforme unique pour les marques souhaitant toucher
            une audience jeune, passionnée et dynamique
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-6">
                <benefit.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black mb-6">Intéressé par un partenariat ?</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Rejoignez-nous dans cette aventure unique et associez votre marque à l'événement
                basket le plus attendu de l'année.
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  <span>Packages de sponsoring flexibles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  <span>Activation de marque sur site</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  <span>Visibilité digitale garantie</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  <span>Retombées médiatiques</span>
                </li>
              </ul>
            </div>
            <div className="bg-white text-slate-900 p-8 lg:p-10">
              <h4 className="text-2xl font-black mb-6">Contactez-nous</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Nom de l'entreprise"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none transition-colors resize-none"
                />
                {submitStatus === 'success' && (
                  <div className="bg-green-100 text-green-800 px-4 py-3 rounded">
                    Votre demande a été envoyée avec succès !
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-100 text-red-800 px-4 py-3 rounded">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white px-6 py-4 font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
