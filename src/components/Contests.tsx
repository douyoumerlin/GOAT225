import { Rocket, Target, Send, UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Contests() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    contest_type: '',
    player_profile: '',
    city: '',
    commune: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase
        .from('contest_registrations')
        .insert([formData]);

      if (error) throw error;

      setSubmitMessage({ type: 'success', text: 'Inscription réussie ! Nous vous contactons bientôt.' });
      setFormData({ full_name: '', email: '', phone: '', contest_type: '', player_profile: '', city: '', commune: '' });

      setTimeout(() => {
        setSubmitMessage(null);
        setShowForm(false);
      }, 3000);
    } catch (error: any) {
      setSubmitMessage({
        type: 'error',
        text: error.message || 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contests = [
    {
      icon: Rocket,
      title: 'Concours de Dunks',
      participants: '5 participants',
      description: 'Les dunks les plus spectaculaires et créatifs qui défieront la gravité',
      image: '/image.png',
    },
    {
      icon: Target,
      title: 'Concours de 3 Points',
      participants: '5 participants',
      description: 'La précision ultime pour déterminer les meilleurs shooteurs',
      image: '/image copy.png',
    },
  ];

  return (
    <section id="contests" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            LES <span className="text-red-600">CONCOURS</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            10 athlètes supplémentaires pour des performances spectaculaires
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
              </div>

              <div className="relative p-8 h-96 flex flex-col justify-end text-white">
                <contest.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-3xl font-black mb-2">{contest.title}</h3>
                <p className="text-red-600 font-bold text-lg mb-4">{contest.participants}</p>
                <p className="text-gray-200 leading-relaxed">{contest.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 text-white px-8 py-4 font-bold text-lg tracking-wide hover:bg-red-700 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <UserPlus size={24} />
            INSCRIVEZ-VOUS AUX CONCOURS
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 max-w-2xl w-full my-8 border-2 border-red-600 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors"
              >
                <X size={28} />
              </button>

              <div className="p-8">
                <h3 className="text-3xl font-black text-white mb-6">
                  INSCRIPTION AUX CONCOURS
                </h3>

                {submitMessage?.type === 'success' ? (
                  <div className="bg-green-600/20 border border-green-600 p-6 text-center">
                    <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">Inscription réussie !</h4>
                    <p className="text-gray-300">
                      {submitMessage.text}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitMessage?.type === 'error' && (
                      <div className="bg-red-600/20 border border-red-600 p-4 flex items-start gap-3">
                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-white text-sm">{submitMessage.text}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-white font-bold mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">WhatsApp *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Ville *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="Votre ville"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Commune *</label>
                      <input
                        type="text"
                        name="commune"
                        value={formData.commune}
                        onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="Votre commune"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Type de concours *</label>
                      <select
                        name="contest_type"
                        value={formData.contest_type}
                        onChange={(e) => setFormData({ ...formData, contest_type: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-slate-900">Choisissez un concours</option>
                        <option value="dunks" className="bg-slate-900">Concours de Dunks</option>
                        <option value="3points" className="bg-slate-900">Concours de 3 Points</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Profil de joueur *</label>
                      <select
                        name="player_profile"
                        value={formData.player_profile}
                        onChange={(e) => setFormData({ ...formData, player_profile: e.target.value })}
                        required
                        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-slate-900">Sélectionnez votre profil</option>
                        <option value="professional" className="bg-slate-900">Professionnel</option>
                        <option value="amateur" className="bg-slate-900">Amateur</option>
                      </select>
                    </div>

                    <div className="bg-yellow-600/20 border border-yellow-600 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold text-sm mb-1">Information importante</p>
                          <p className="text-gray-300 text-sm">
                            Merci de fournir des informations exactes et vérifiables.
                            Toute fausse information entraînera le rejet de la candidature, sans remboursement.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 text-white px-6 py-4 font-bold text-lg tracking-wide hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'ENVOI EN COURS...' : 'CONFIRMER L\'INSCRIPTION'}
                    </button>

                    <p className="text-gray-400 text-sm text-center">
                      * Champs obligatoires | Places limitées : 5 participants par concours
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-white font-bold mb-2 text-sm">Besoin d'aide ?</p>
                      <div className="text-gray-400 text-sm space-y-1">
                        <p>Contactez-nous :</p>
                        <p className="text-white">📞 +225 05 05 35 83 44</p>
                        <p className="text-white">📞 +225 07 09 50 23 36</p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-red-600 text-white p-12 text-center">
          <h3 className="text-3xl font-black mb-4">Un Show Complet</h3>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Au-delà de la compétition, profitez de showcases artistiques et d'une ambiance
            digne des plus grands shows. Sport, culture et divertissement fusionnent pour créer
            une expérience inoubliable.
          </p>
        </div>
      </div>
    </section>
  );
}
