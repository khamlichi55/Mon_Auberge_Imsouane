import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, User, Mail, Phone, ArrowLeft, Search } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
type ActivityReservation = {
  id: string;
  activityName: string;
  description?: string;
  price: number;
  duration: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  participants: number;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  timestamp?: Date;
};

const ActivityAdmin: React.FC = () => {
  const [reservations, setReservations] = useState<ActivityReservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ActivityReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Nombre de réservations par page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityReservations = async () => {
      try {
        const q = query(collection(db, 'activityReservations'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'pending',
          timestamp: doc.data().timestamp?.toDate()
        })) as ActivityReservation[];
        setReservations(data);
        setFilteredReservations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityReservations();
  }, []);

  useEffect(() => {
    let results = reservations;
    if (searchTerm) {
      results = results.filter(res =>
        res.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (res.phone && res.phone.includes(searchTerm))
      );
    }
    if (statusFilter !== 'all') {
      results = results.filter(res => res.status === statusFilter);
    }
    setFilteredReservations(results);
    setCurrentPage(1); // Remettre à la première page si filtre ou recherche change
  }, [searchTerm, statusFilter, reservations]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const handleConfirmReservation = async (reservationId: string) => {
    try {
      const resRef = doc(db, 'activityReservations', reservationId);
      await updateDoc(resRef, { status: 'confirmed' });
      setReservations(reservations.map(res =>
        res.id === reservationId ? { ...res, status: 'confirmed' } : res
      ));
    } catch (error) {
      console.error("Erreur lors de la confirmation :", error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      const resRef = doc(db, 'activityReservations', reservationId);
      await updateDoc(resRef, { status: 'cancelled' });
      setReservations(reservations.map(res =>
        res.id === reservationId ? { ...res, status: 'cancelled' } : res
      ));
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
         
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-4 rounded-lg"
            aria-label="Retour"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Réservations d'activités</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
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
          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="cancelled">Annulées</option>
          </select>
          <button
              onClick={() => signOut(auth)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >Déconnexion
            </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{reservation.activityName}</div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{reservation.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-900 mb-1">
                        <User size={14} className="mr-2 text-gray-500" />
                        <span>{reservation.name}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Mail size={14} className="mr-2 text-gray-500" />
                        <span>{reservation.email}</span>
                      </div>
                      {reservation.phone && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Phone size={14} className="mr-2 text-gray-500" />
                          <span>{reservation.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={14} className="mr-2 text-gray-500" />
                        <span className="text-sm">{formatDate(reservation.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {reservation.participants}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{reservation.price} €</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : reservation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status === 'confirmed'
                          ? 'Confirmée'
                          : reservation.status === 'pending'
                          ? 'En attente'
                          : 'Annulée'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmReservation(reservation.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Refuser
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
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

export default ActivityAdmin;