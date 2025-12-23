import { useState, FormEvent, useEffect } from 'react';
import { UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Registration() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    category: '',
    playerProfile: '',
    city: '',
    commune: '',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showForm]);

  const determineCategory = (age: number): { category: string; fee: number } | null => {
    if (age < 18) {
      return null;
    } else if (age >= 18 && age <= 29) {
      return { category: 'junior', fee: 10000 };
    } else {
      return { category: 'senior', fee: 20000 };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'age' && value) {
      const ageNum = parseInt(value);
      const categoryInfo = determineCategory(ageNum);
      if (categoryInfo) {
        setFormData(prev => ({ ...prev, category: categoryInfo.category }));
        setError('');
      } else {
        setError('Vous devez avoir au moins 18 ans pour participer.');
        setFormData(prev => ({ ...prev, category: '' }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const ageNum = parseInt(formData.age);
    const categoryInfo = determineCategory(ageNum);

    if (!categoryInfo) {
      setError('Vous devez avoir au moins 18 ans pour participer.');
      setLoading(false);
      return;
    }

    const registrationFee = formData.category === 'junior' ? 10000 : 20000;

    const { error: insertError } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: ageNum,
          category: formData.category,
          player_profile: formData.playerProfile,
          registration_fee: registrationFee,
          payment_status: 'pending',
          city: formData.city,
          commune: formData.commune,
        },
      ])
      .select()
      .maybeSingle();

    setLoading(false);

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Cet email est déjà enregistré.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      return;
    }

    setSuccess(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      category: '',
      playerProfile: '',
      city: '',
      commune: '',
    });
  };

  const getCategoryInfo = () => {
    if (!formData.age) return null;
    const ageNum = parseInt(formData.age);
    return determineCategory(ageNum);
  };

  const categoryInfo = getCategoryInfo();

  return (
    <section id="register" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            INSCRIVEZ-VOUS <span className="text-red-600">MAINTENANT</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Rejoignez le plus grand tournoi 1vs1 de Côte d'Ivoire
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Catégorie Junior</h3>
              <span className="bg-red-600 text-white px-4 py-2 font-bold text-sm">18-29 ans</span>
            </div>
            <p className="text-gray-300 mb-4">
              Jeunes talents, espoirs, joueurs de centres de club ou amateur
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-600">10 000</span>
              <span className="text-gray-400">FCFA</span>
            </div>
            <div className="mt-4 text-gray-400 text-sm">
              Effectif limité à 32 joueurs
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Catégorie Sénior</h3>
              <span className="bg-red-600 text-white px-4 py-2 font-bold text-sm">30+ ans</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professionnels, vétérans des ligues ou amateurs expérimentés
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-600">20 000</span>
              <span className="text-gray-400">FCFA</span>
            </div>
            <div className="mt-4 text-gray-400 text-sm">
              Effectif limité à 32 joueurs
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 text-white px-8 py-4 font-bold text-lg tracking-wide hover:bg-red-700 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <UserPlus size={24} />
            INSCRIPTION EN LIGNE
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 max-w-2xl w-full my-8 border-2 border-red-600 relative">
            <button
              onClick={() => {
                setShowForm(false);
                setSuccess(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors"
            >
              <X size={28} />
            </button>

            <div className="p-8">
              <h3 className="text-3xl font-black text-white mb-6">
                FORMULAIRE D'INSCRIPTION
              </h3>

              {success ? (
                <div className="bg-green-600/20 border border-green-600 p-6 text-center">
                  <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Inscription réussie !</h4>
                  <p className="text-gray-300">
                    Vous serez contacté(e) par WhatsApp pour la suite du processus.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-600/20 border border-red-600 p-4 flex items-start gap-3">
                      <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-white text-sm">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-white font-bold mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">WhatsApp *</label>
                    <input
                      type="tel"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Votre commune"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Âge *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="18"
                      max="100"
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Votre âge"
                    />
                    {categoryInfo && (
                      <div className="mt-3 bg-red-600/20 border border-red-600 p-3">
                        <p className="text-white font-bold">
                          Catégorie : {categoryInfo.category === 'junior' ? 'Junior (18-29 ans)' : 'Sénior (30+ ans)'}
                        </p>
                        <p className="text-gray-300 text-sm mt-1">
                          Frais d'inscription : {categoryInfo.fee.toLocaleString()} FCFA
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Catégorie *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-red-600 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-slate-900">Sélectionnez votre catégorie</option>
                      <option value="junior" className="bg-slate-900">Junior (18-29 ans) - 10 000 FCFA</option>
                      <option value="senior" className="bg-slate-900">Sénior (30+ ans) - 20 000 FCFA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Profil de joueur *</label>
                    <select
                      name="playerProfile"
                      value={formData.playerProfile}
                      onChange={handleInputChange}
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
                    disabled={loading}
                    className="w-full bg-red-600 text-white px-6 py-4 font-bold text-lg tracking-wide hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? 'ENVOI EN COURS...' : 'CONFIRMER L\'INSCRIPTION'}
                  </button>

                  <p className="text-gray-400 text-sm text-center">
                    * Champs obligatoires
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
