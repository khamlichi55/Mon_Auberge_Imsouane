import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { signOut } from 'firebase/auth';

// Types

type Reservation = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: any;
};

const RoomsAdmin: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          status: doc.data().status || 'pending',
          ...doc.data()
        })) as Reservation[];
        setReservations(data);
        setFilteredReservations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    let results = reservations;
    if (searchTerm) {
      results = results.filter(res =>
        `${res.firstName} ${res.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.phone.includes(searchTerm) ||
        res.roomType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      results = results.filter(res => res.status === statusFilter);
    }
    setFilteredReservations(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, reservations]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const handleConfirmReservation = async (reservationId: string) => {
    try {
      const resRef = doc(db, 'reservations', reservationId);
      await updateDoc(resRef, { status: 'confirmed' });
      setReservations(reservations.map(res =>
        res.id === reservationId ? { ...res, status: 'confirmed' } : res
      ));
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      const resRef = doc(db, 'reservations', reservationId);
      await updateDoc(resRef, { status: 'cancelled' });
      setReservations(reservations.map(res =>
        res.id === reservationId ? { ...res, status: 'cancelled' } : res
      ));
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Chargement en cours...</p></div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-4 rounded-lg" aria-label="Retour">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des réservations de chambres</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border rounded-lg px-3 py-2 bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="cancelled">Annulées</option>
          </select>
          <button onClick={() => signOut(auth)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Déconnexion</button>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Aucune réservation trouvée</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{reservation.firstName} {reservation.lastName}</div>
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {reservation.roomType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.checkIn}</div>
                      <div className="text-sm text-gray-500">au {reservation.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.guests}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status === 'confirmed' ? 'Confirmée' : reservation.status === 'pending' ? 'En attente' : 'Annulée'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {reservation.status === 'pending' && (
                        <>
                          <button onClick={() => handleConfirmReservation(reservation.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Confirmer</button>
                          <button onClick={() => handleCancelReservation(reservation.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Annuler</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomsAdmin;