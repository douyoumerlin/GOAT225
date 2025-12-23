import { useEffect, useState } from 'react';
import { Download, Users, Trophy, LogOut, Handshake } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Registration {
  id: string;
  registration_number: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  city: string;
  commune: string;
  created_at: string;
}

interface ContestRegistration {
  id: string;
  registration_number: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  city: string;
  commune: string;
  player_profile: string;
  created_at: string;
}

interface PartnerInquiry {
  id: string;
  inquiry_number: number;
  company_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contestRegistrations, setContestRegistrations] = useState<ContestRegistration[]>([]);
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'registrations' | 'contests' | 'partners'>('registrations');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: regData } = await supabase
        .from('registrations')
        .select('*')
        .order('registration_number', { ascending: false });

      const { data: contestData } = await supabase
        .from('contest_registrations')
        .select('*')
        .order('registration_number', { ascending: false });

      const { data: partnerData } = await supabase
        .from('partner_inquiries')
        .select('*')
        .order('inquiry_number', { ascending: false });

      setRegistrations(regData || []);
      setContestRegistrations(contestData || []);
      setPartnerInquiries(partnerData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          const stringValue = value === null || value === undefined ? '' : String(value);
          return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              Administration GOAT 225
            </h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <Users size={32} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Inscriptions Générales</p>
                <p className="text-3xl font-bold text-white">{registrations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <Trophy size={32} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Inscriptions Concours</p>
                <p className="text-3xl font-bold text-white">{contestRegistrations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <Handshake size={32} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Demandes Partenariat</p>
                <p className="text-3xl font-bold text-white">{partnerInquiries.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="border-b border-slate-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('registrations')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'registrations'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Inscriptions Générales ({registrations.length})
              </button>
              <button
                onClick={() => setActiveTab('contests')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'contests'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Inscriptions Concours ({contestRegistrations.length})
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'partners'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Demandes Partenariat ({partnerInquiries.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {activeTab === 'registrations'
                  ? 'Liste des inscriptions générales'
                  : activeTab === 'contests'
                  ? 'Liste des inscriptions concours'
                  : 'Liste des demandes de partenariat'}
              </h2>
              <button
                onClick={() =>
                  downloadCSV(
                    activeTab === 'registrations' ? registrations : activeTab === 'contests' ? contestRegistrations : partnerInquiries,
                    `${activeTab === 'registrations' ? 'inscriptions' : activeTab === 'contests' ? 'concours' : 'partenaires'}_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download size={20} />
                Télécharger CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'partners' ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">N°</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Entreprise</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Téléphone</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Message</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date de demande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="py-3 px-4 text-white font-bold">#{inquiry.inquiry_number}</td>
                        <td className="py-3 px-4 text-white">{inquiry.company_name}</td>
                        <td className="py-3 px-4 text-white">{inquiry.email}</td>
                        <td className="py-3 px-4 text-white">{inquiry.phone}</td>
                        <td className="py-3 px-4 text-white max-w-md truncate">{inquiry.message}</td>
                        <td className="py-3 px-4 text-white">{new Date(inquiry.created_at).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">N°</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Nom</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Prénom</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Téléphone</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Ville</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Commune</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date de naissance</th>
                      {activeTab === 'contests' && (
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Profil</th>
                      )}
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date d'inscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'registrations'
                      ? registrations.map((reg) => (
                          <tr key={reg.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                            <td className="py-3 px-4 text-white font-bold">#{reg.registration_number}</td>
                            <td className="py-3 px-4 text-white">{reg.last_name}</td>
                            <td className="py-3 px-4 text-white">{reg.first_name}</td>
                            <td className="py-3 px-4 text-white">{reg.email}</td>
                            <td className="py-3 px-4 text-white">{reg.phone}</td>
                            <td className="py-3 px-4 text-white">{reg.city}</td>
                            <td className="py-3 px-4 text-white">{reg.commune}</td>
                            <td className="py-3 px-4 text-white">{new Date(reg.birth_date).toLocaleDateString('fr-FR')}</td>
                            <td className="py-3 px-4 text-white">{new Date(reg.created_at).toLocaleDateString('fr-FR')}</td>
                          </tr>
                        ))
                      : contestRegistrations.map((reg) => (
                          <tr key={reg.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                            <td className="py-3 px-4 text-white font-bold">#{reg.registration_number}</td>
                            <td className="py-3 px-4 text-white">{reg.last_name}</td>
                            <td className="py-3 px-4 text-white">{reg.first_name}</td>
                            <td className="py-3 px-4 text-white">{reg.email}</td>
                            <td className="py-3 px-4 text-white">{reg.phone}</td>
                            <td className="py-3 px-4 text-white">{reg.city}</td>
                            <td className="py-3 px-4 text-white">{reg.commune}</td>
                            <td className="py-3 px-4 text-white">{new Date(reg.birth_date).toLocaleDateString('fr-FR')}</td>
                            <td className="py-3 px-4 text-white">{reg.player_profile}</td>
                            <td className="py-3 px-4 text-white">{new Date(reg.created_at).toLocaleDateString('fr-FR')}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
