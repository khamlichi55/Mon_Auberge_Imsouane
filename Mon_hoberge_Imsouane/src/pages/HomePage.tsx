import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, Sun as Surf, Sunset, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';



const HomePage: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: 'Emplacement Parfait',
      description: 'Situé directement sur la plage d\'Imsouane, à quelques pas de l\'océan.',
    },
    {
      icon: <Coffee className="h-8 w-8 text-green-600" />,
      title: 'Ambiance Détendue',
      description: 'Une atmosphère chaleureuse et conviviale où se sentir comme chez soi.',
    },
    {
      icon: <Surf className="h-8 w-8 text-green-600" />,
      title: 'Activités Variées',
      description: 'Du surf aux randonnées, des activités pour tous les goûts.',
    },
    {
      icon: <Sunset className="h-8 w-8 text-green-600" />,
      title: 'Vues Imprenables',
      description: 'Admirez les plus beaux couchers de soleil depuis notre terrasse panoramique.',
    },
  ];

  const testimonials = [
    {
      text: "Un séjour inoubliable à Mon Auberge ! L'accueil était chaleureux, les chambres confortables et la vue sur l'océan à couper le souffle. Je reviendrai très bientôt !",
      author: "Sophie L.",
      location: "Paris, France",
    },
    {
      text: "Les cours de surf proposés par l'auberge sont excellents ! J'ai appris les bases en seulement deux jours grâce à des moniteurs patients et passionnés.",
      author: "Thomas M.",
      location: "Bruxelles, Belgique",
    },
    {
      text: "Endroit parfait pour se déconnecter et profiter de la nature. L'équipe est aux petits soins et les repas préparés avec des produits locaux sont délicieux.",
      author: "Marine D.",
      location: "Bordeaux, France",
    },
  ];

  return (
    <>
      <HeroSection
        title="Mon Auberge"
        subtitle="Votre oasis de paix au cœur d'Imsouane, Maroc"
        imageSrc="images/view3.jpg"
      />
      
      <SectionContainer
        id="bienvenue"
        title="Bienvenue à Mon Auberge"
        subtitle="Une expérience authentique entre mer et montagne"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Niché dans le village pittoresque d'Imsouane, <strong>Mon Auberge</strong> vous offre une expérience authentique et chaleureuse face à l'océan Atlantique. Notre établissement combine le charme traditionnel marocain avec le confort moderne pour créer un havre de paix où vous pourrez vous ressourcer.
            </p>
            <p className="mb-6">
              Que vous soyez un surfeur à la recherche des vagues parfaites, un voyageur en quête de tranquillité, ou une famille désireuse de découvrir les merveilles du Maroc, Mon Auberge vous accueille à bras ouverts pour un séjour inoubliable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/chambres" className="btn btn-primary">
                Découvrir nos chambres
              </Link>
              <Link to="/activites" className="btn btn-outline">
                Explorer les activités
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/planche.avif" 
              alt="Vue de l'auberge"
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
            <img
              src="/images/plage_surf.jpg"
              alt="Plage d'Imsouane"
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
            <img
              src="/images/roof.jpg"
              alt="Terrasse de l'auberge"
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
            <img
              src="/images/sable.avif"
              alt="Chambre de l'auberge"
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />

        
          </div>
        </div>
      </SectionContainer>
      
      <SectionContainer
        bgColor="bg-beige-50"
        title="Pourquoi choisir Mon Auberge"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
      
      <SectionContainer
        title="Nos Hébergements"
        subtitle="Des options confortables pour tous les types de voyageurs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card group">
            <div className="image-hover">
              <img 
                src="images/lit_dortoir.jpg" 
                alt="Dortoir" 
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-800">Dortoir</h3>
              <div className="flex items-center mb-3 text-gray-600">
                <Users size={18} className="mr-1" />
                <span className="text-sm">À partir de 20€/nuit</span>
              </div>
              <p className="text-gray-600 mb-4">
                Option économique idéale pour les voyageurs solo et les groupes d'amis.
              </p>
              <Link 
                to="/chambres" 
                className="btn btn-outline w-full group-hover:bg-green-600 group-hover:text-white"
              >
                Voir plus
              </Link>
            </div>
          </div>
          
          <div className="card group">
            <div className="image-hover">
              <img 
                src="images/lit2.jpg" 
                alt="Chambre Double" 
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-800">Chambre Double</h3>
              <div className="flex items-center mb-3 text-gray-600">
                <Users size={18} className="mr-1" />
                <span className="text-sm">À partir de 60€/nuit</span>
              </div>
              <p className="text-gray-600 mb-4">
                Confort et intimité pour les couples ou voyageurs cherchant plus d'espace.
              </p>
              <Link 
                to="/chambres" 
                className="btn btn-outline w-full group-hover:bg-green-600 group-hover:text-white"
              >
                Voir plus
              </Link>
            </div>
          </div>
          
          <div className="card group">
            <div className="image-hover">
              <img 
                src="images/lit1.jpg" 
                alt="Chambre Familiale" 
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-800">Chambre Familiale</h3>
              <div className="flex items-center mb-3 text-gray-600">
                <Users size={18} className="mr-1" />
                <span className="text-sm">À partir de 90€/nuit</span>
              </div>
              <p className="text-gray-600 mb-4">
                Spacieuse et accueillante, parfaite pour les familles ou petits groupes.
              </p>
              <Link 
                to="/chambres" 
                className="btn btn-outline w-full group-hover:bg-green-600 group-hover:text-white"
              >
                Voir plus
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/chambres" className="btn btn-primary">
            Voir tous nos hébergements
          </Link>
        </div>
      </SectionContainer>
      
      <SectionContainer
        bgColor="bg-blue-50"
        title="Ce que nos clients disent"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-2 w-10 bg-green-600 rounded-full"></div>
              </div>
              <p className="italic text-gray-600 mb-4">{testimonial.text}</p>
              <div>
                <p className="font-semibold text-green-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
      
      <SectionContainer
        title="Réservez votre séjour"
        subtitle="Prêt à vivre une expérience inoubliable à Imsouane ?"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-8">
            Contactez-nous pour vérifier les disponibilités ou effectuez directement une demande de réservation en ligne. Notre équipe sera ravie de vous accueillir et de rendre votre séjour aussi agréable que possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/reservation" className="btn btn-primary">
              Réserver maintenant
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default HomePage;