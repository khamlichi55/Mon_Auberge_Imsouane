import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import ActivityCard from '../components/ActivityCard';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ActivitiesPage: React.FC = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');


  const activities = [
    {
      id: 1,
      name: 'Cours de Surf Débutant',
      description: 'Apprenez les bases du surf avec nos instructeurs expérimentés. Matériel inclus. Idéal pour les débutants complets.',
      price: 40,
      duration: '2 heures',
      imageSrc: 'https://images.pexels.com/photos/1549196/pexels-photo-1549196.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 2,
      name: 'Cours de Surf Intermédiaire',
      description: 'Perfectionnez votre technique et progressez au niveau supérieur. Pour ceux qui ont déjà les bases du surf.',
      price: 50,
      duration: '3 heures',
      imageSrc: 'https://images.pexels.com/photos/1654498/pexels-photo-1654498.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 3,
      name: 'Excursion en Quad',
      description: 'Explorez les magnifiques paysages autour d\'Imsouane lors d\'une excursion en quad. Panoramas à couper le souffle garantis !',
      price: 60,
      duration: '3 heures',
      imageSrc: 'images/quad.jpg',
    },
    {
      id: 4,
      name: 'Randonnée le long de la côte',
      description: 'Découvrez les falaises spectaculaires et les criques cachées lors d\'une randonnée guidée le long de la côte atlantique.',
      price: 25,
      duration: '4 heures',
      imageSrc: 'images/sahara.jpg',
    },
    {
      id: 5,
      name: 'Kayak dans la baie',
      description: 'Explorez la magnifique baie d\'Imsouane en kayak. Possibilité d\'observer des dauphins et la riche vie marine locale.',
      price: 35,
      duration: '2 heures',
      imageSrc: 'images/kayak2.jpg',
    },
    {
      id: 6,
      name: 'Journée à Paradise Valley',
      description: 'Excursion d\'une journée aux célèbres piscines naturelles de Paradise Valley. Transport, guide et pique-nique inclus.',
      price: 70,
      duration: 'Journée complète',
      imageSrc: 'images/Paradise.jpg',
    },
    {
      id: 7,
      name: 'Atelier de Cuisine Marocaine',
      description: 'Apprenez à préparer de délicieux plats marocains traditionnels avec notre chef local. Dégustation incluse !',
      price: 45,
      duration: '3 heures',
      imageSrc: 'images/plat_marocain.jpg',
    },
    {
      id: 8,
      name: 'Excursion à Essaouira',
      description: 'Visitez la charmante ville côtière d\'Essaouira, connue pour ses remparts, son port de pêche et son ambiance artistique.',
      price: 80,
      duration: 'Journée complète',
      imageSrc: 'images/essaouira.jpg',
    },
    {
      id: 9,
      name: 'Yoga au coucher de soleil',
      description: 'Session de yoga relaxante sur la plage au coucher du soleil. Tous niveaux bienvenus, tapis fournis.',
      price: 20,
      duration: '1 heure',
      imageSrc: 'images/yoga2.jpg',
    },
  ];

  const handleBooking = (activity: any) => {
    setSelectedActivity(activity);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedActivity(null);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const participants = (form.elements.namedItem('participants') as HTMLSelectElement).value;
    const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value;

    try {
      await addDoc(collection(db, 'activityReservations'), {
        activityId: selectedActivity.id,
        activityName: selectedActivity.name,
        name,
        email,
        date,
        participants: Number(participants),
        notes,
        price: selectedActivity.price,
        duration: selectedActivity.duration,
        timestamp: Timestamp.now(),
      });

      setSuccessMessage('✅ Votre réservation a bien été enregistrée !');
      setShowBookingModal(false);
      setSelectedActivity(null);
      setTimeout(() => setSuccessMessage(''), 10000);

    } catch (error) {
      console.error("Erreur Firestore :", error);
      alert('Erreur lors de la réservation. Veuillez réessayer plus tard.');
    }
  };

  return (
    <>
      <HeroSection
        title="Activités & Excursions"
        subtitle="Découvrez les merveilles d'Imsouane et de ses environs"
        imageSrc="images/view21.jpg"
        fullHeight={false}
        
      />

      <SectionContainer
        id="activites"
        title="Nos Activités"
        subtitle="Des expériences uniques pour tous les goûts"
      >
        {successMessage && (
             <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative mb-4 text-center shadow-md">
        {successMessage}
      </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              name={activity.name}
              description={activity.description}
              price={activity.price}
              duration={activity.duration}
              imageSrc={activity.imageSrc}
              onBooking={() => handleBooking(activity)}
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        bgColor="bg-blue-50"
        title="Informations Pratiques"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="section-subtitle">Réservation</h3>
            <ul className="space-y-2">
              <li>Les activités peuvent être réservées à la réception de l'auberge</li>
              <li>Réservation en ligne au moins 24h à l'avance recommandée</li>
              <li>Paiement à la réservation pour garantir votre place</li>
              <li>Tarifs de groupe disponibles (à partir de 4 personnes)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="section-subtitle">Conditions</h3>
            <ul className="space-y-2">
              <li>Les activités sont soumises aux conditions météorologiques</li>
              <li>Annulation gratuite jusqu'à 48h avant l'activité</li>
              <li>Équipement spécifique inclus, sauf indication contraire</li>
              <li>Certaines activités requièrent un niveau minimal de condition physique</li>
            </ul>
          </div>
        </div>
      </SectionContainer>
          
      {/* Modal de réservation */}
      {showBookingModal && selectedActivity && (
        

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Réserver {selectedActivity.name}</h2>
            <p className="mb-4 text-gray-600">Prix: {selectedActivity.price} € • Durée: {selectedActivity.duration}</p>
            
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">Nom complet</label>
                <input type="text" id="name" className="form-input" required />
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-input" required />
              </div>

              <div>
                <label htmlFor="date" className="form-label">Date souhaitée</label>
                <input type="date" id="date" className="form-input" required />
              </div>

              <div>
                <label htmlFor="participants" className="form-label">Nombre de participants</label>
                <select id="participants" className="form-input" required>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="form-label">Notes supplémentaires</label>
                <textarea id="notes" rows={3} className="form-input"></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Confirmer la réservation
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivitiesPage;
