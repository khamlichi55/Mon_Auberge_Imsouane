import React from 'react';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import BookingForm from '../components/BookingForm';
const imagesSrc1 = '/images/plage_surf.jpg';
const BookingPage: React.FC = () => {
  return (
    <>
      <HeroSection
        title="Réservation"
        subtitle="Réservez votre séjour à Mon Auberge"
        imageSrc={imagesSrc1}
        fullHeight={false}
        showButton={false}
      />
      
      <SectionContainer
        id="reservation"
        title="Demande de Réservation"
        subtitle="Remplissez le formulaire ci-dessous pour réserver votre hébergement"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BookingForm />
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="section-subtitle">Contact Direct</h3>
              <p className="mb-4">Vous préférez réserver par téléphone ou par email ?</p>
              <ul className="space-y-2">
                <li>Téléphone: <a href="tel:+212612345678" className="text-green-600 hover:underline">+212 612 345 678</a></li>
                <li>Email: <a href="mailto:reservations@monauberge.com" className="text-green-600 hover:underline">reservations@monauberge.com</a></li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="section-subtitle">Bon à savoir</h3>
              <ul className="space-y-2">
                <li>Arrivée à partir de 14h00</li>
                <li>Départ jusqu'à 11h00</li>
                <li>Petit-déjeuner inclus dans tous nos tarifs</li>
                <li>Acompte de 30% pour confirmer la réservation</li>
                <li>Annulation gratuite jusqu'à 7 jours avant l'arrivée</li>
                <li>Wi-Fi gratuit dans tout l'établissement</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      <SectionContainer
        bgColor="bg-green-50"
        title="Questions Fréquentes"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">Comment puis-je payer ma réservation ?</h3>
            <p className="text-gray-600 mb-4">
              Nous acceptons les paiements par carte bancaire, virement bancaire ou espèces (MAD ou EUR). Un acompte de 30% est requis pour confirmer votre réservation, le solde étant payable à l'arrivée.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">Proposez-vous un service de transfert depuis l'aéroport ?</h3>
            <p className="text-gray-600 mb-4">
              Oui, nous proposons un service de transfert depuis l'aéroport d'Agadir et de Marrakech. Veuillez nous contacter à l'avance pour organiser votre transfert et connaître les tarifs.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">Y a-t-il un restaurant dans l'auberge ?</h3>
            <p className="text-gray-600 mb-4">
              Nous servons un petit-déjeuner traditionnel marocain inclus dans le prix de la chambre. Pour le déjeuner et le dîner, notre café propose une carte de plats locaux à des prix abordables.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">Est-il possible de réserver pour un long séjour ?</h3>
            <p className="text-gray-600 mb-4">
              Absolument ! Nous proposons des tarifs spéciaux pour les séjours de plus d'une semaine. Contactez-nous directement pour discuter de votre projet de séjour prolongé.
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default BookingPage;