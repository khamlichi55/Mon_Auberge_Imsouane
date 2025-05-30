import React from 'react';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import RoomCard from '../components/RoomCard';
import { Coffee, Wifi, Tv, LocateFixed, Wind, Waves } from 'lucide-react';

const RoomsPage: React.FC = () => {
  
  const rooms = [
    {
      id: 'dortoir',
      name: 'Lit en Dortoir',
      description: 'Option économique parfaite pour les voyageurs solos. Dortoirs mixtes ou réservés aux femmes disponibles, avec des lits confortables et des casiers sécurisés.',
      price: 20,
      capacity: 1,
      imageSrc: "images/lit_dortoir.jpg",
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
      ],
    },
    {
      id: 'double',
      name: 'Chambre Double',
      description: 'Chambre confortable avec un lit double, idéale pour les couples. Décoration traditionnelle marocaine et atmosphère chaleureuse.',
      price: 60,
      capacity: 2,
      imageSrc: 'images/lit2.jpg',
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
        { icon: <Tv size={16} />, text: 'TV satellite' },
        { icon: <LocateFixed size={16} />, text: 'Vue sur jardin' },
      ],
    },
    {
      id: 'twin',
      name: 'Chambre Twin',
      description: 'Chambre avec deux lits simples, parfaite pour les amis voyageant ensemble. Spacieuse et lumineuse avec balcon privé.',
      price: 65,
      capacity: 2,
      imageSrc: 'images/lit3.jpg',
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
        { icon: <Tv size={16} />, text: 'TV satellite' },
        { icon: <LocateFixed size={16} />, text: 'Balcon privé' },
      ],
    },
    {
      id: 'familiale',
      name: 'Chambre Familiale',
      description: 'Grande chambre pouvant accueillir jusqu\'à 4 personnes. Idéale pour les familles avec enfants ou petits groupes d\'amis.',
      price: 90,
      capacity: 4,
      imageSrc: 'images/lit1.jpg',
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
        { icon: <Tv size={16} />, text: 'TV satellite' },
        { icon: <LocateFixed size={16} />, text: 'Terrasse privée' },
      ],
    },
    {
      id: 'deluxe',
      name: 'Chambre Deluxe Vue Mer',
      description: 'Notre meilleure chambre avec vue panoramique sur l\'océan. Très spacieuse avec salle de bain privative luxueuse et grand balcon.',
      price: 110,
      capacity: 2,
      imageSrc: 'images/lit5.jpg',
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
        { icon: <Wind size={16} />, text: 'Climatisation' },
        { icon: <Waves size={16} />, text: 'Vue sur océan' },
      ],
    },
    {
      id: 'suite',
      name: 'Suite Junior',
      description: 'Suite spacieuse avec salon séparé, chambre avec lit king-size et grand balcon donnant sur l\'océan et la baie d\'Imsouane.',
      price: 140,
      capacity: 3,
      imageSrc: 'images/lit4.jpg',
      amenities: [
        { icon: <Coffee size={16} />, text: 'Petit-déjeuner inclus' },
        { icon: <Wifi size={16} />, text: 'Wi-Fi gratuit' },
        { icon: <Wind size={16} />, text: 'Climatisation' },
        { icon: <Waves size={16} />, text: 'Vue panoramique' },
      ],
    },
  ];

  const facilities = [
    "Réception 24h/24",
    "Wi-Fi gratuit dans tout l'établissement",
    "Petit-déjeuner marocain traditionnel",
    "Terrasse panoramique avec vue sur l'océan",
    "Salle commune avec TV et jeux de société",
    "Cuisine commune équipée",
    "Service de location de matériel de surf",
    "Parking gratuit",
    "Transfert aéroport (en supplément)",
    "Organisation d'excursions et d'activités",
    "Blanchisserie (en supplément)",
    "Consigne à bagages"
  ];

  return (
    <>
      <HeroSection
        title="Nos Chambres"
        subtitle="Un confort authentique face à l'océan"
        imageSrc="images/view6.jpg"
        fullHeight={false}
      />
      
      <SectionContainer
        id="chambres"
        title="Découvrez Nos Hébergements"
        subtitle="Des options pour tous les budgets et tous les styles de voyage"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              description={room.description}
              price={room.price}
              capacity={room.capacity}
              imageSrc={room.imageSrc}
              amenities={room.amenities}
            />
          ))}
        </div>
      </SectionContainer>
      
      <SectionContainer
        bgColor="bg-beige-50"
        title="Services et Équipements"
        subtitle="Tout ce dont vous avez besoin pour un séjour confortable"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
      
      <SectionContainer
        title="Informations Pratiques"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="section-subtitle">Horaires</h3>
            <ul className="space-y-2">
              <li><strong>Arrivée :</strong> à partir de 14h00</li>
              <li><strong>Départ :</strong> jusqu'à 11h00</li>
              <li><strong>Réception :</strong> ouverte 24h/24</li>
            </ul>
            
            <h3 className="section-subtitle mt-6">Enfants et Lits</h3>
            <ul className="space-y-2">
              <li>Les enfants de tout âge sont les bienvenus</li>
              <li>Les enfants de 0 à 3 ans séjournent gratuitement dans un lit bébé</li>
              <li>Les enfants de 4 à 12 ans bénéficient d'un tarif réduit</li>
              <li>Les lits d'appoint sont disponibles sur demande (supplément possible)</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="section-subtitle">Conditions</h3>
            <ul className="space-y-2">
              <li>Les animaux de compagnie ne sont pas admis</li>
              <li>Établissement non-fumeur dans les chambres (zones fumeurs désignées)</li>
              <li>Paiement en espèces (MAD, EUR) ou par carte bancaire</li>
              <li>Acompte de 30% requis pour confirmer la réservation</li>
            </ul>
            
            <h3 className="section-subtitle mt-6">Annulation</h3>
            <ul className="space-y-2">
              <li>Annulation gratuite jusqu'à 7 jours avant l'arrivée</li>
              <li>Annulation entre 7 et 3 jours : 50% du montant total sera facturé</li>
              <li>Annulation à moins de 3 jours : 100% du montant total sera facturé</li>
              <li>En cas de non-présentation : 100% du montant total sera facturé</li>
            </ul>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default RoomsPage;