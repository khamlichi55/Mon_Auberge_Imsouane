import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Users, Home } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const BookingForm: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomParam = searchParams.get('room');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomType: roomParam || '',
    guests: '1',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false); // <-- Ajouté ici

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSubmitted(false);

    try {
      await addDoc(collection(db, "reservations"), {
        ...formData,
        guests: Number(formData.guests),
        createdAt: new Date()
      });

      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        roomType: roomParam || '',
        guests: '1',
        checkIn: '',
        checkOut: '',
        specialRequests: '',
      });

      setSubmitted(true); // <-- Afficher le message de validation

    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Message de validation */}
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <p className="font-medium">Votre demande de réservation a été envoyée avec succès !</p>
          <p className="mt-2">Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.</p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="form-label">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="roomType" className="form-label flex items-center">
              <Home size={16} className="mr-1" />
              Type de chambre
            </label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Sélectionnez une chambre</option>
              <option value="dortoir">Lit en dortoir</option>
              <option value="double">Chambre Double</option>
              <option value="twin">Chambre Twin</option>
              <option value="familiale">Chambre Familiale</option>
              <option value="deluxe">Chambre Deluxe Vue Mer</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="guests" className="form-label flex items-center">
              <Users size={16} className="mr-1" />
              Nombre de personnes
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="form-input"
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="form-label flex items-center">
              <Calendar size={16} className="mr-1" />
              Date d'arrivée
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="checkOut" className="form-label flex items-center">
              <Calendar size={16} className="mr-1" />
              Date de départ
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="form-label">Demandes spéciales</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="form-input"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande de réservation'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
