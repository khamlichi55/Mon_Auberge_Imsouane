import React from 'react';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <>
      <HeroSection
        title="Contact & Informations"
        subtitle="Nous sommes là pour répondre à toutes vos questions"
        imageSrc="images/view4.jpg"
        fullHeight={false}
        showButton={false}
      />
      
      <SectionContainer
        id="contact"
        title="Contactez-Nous"
        subtitle="Notre équipe est à votre disposition pour vous aider"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="section-subtitle">Coordonnées</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <MapPin className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p>Plage d'Imsouane, Province d'Agadir</p>
                    <p>Maroc</p>
                  </div>
                </li>
                <li className="flex">
                  <Phone className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p><a href="tel:+212612345678" className="hover:text-green-600 transition-colors">+212 612 345 678</a></p>
                    <p><a href="tel:+212587654321" className="hover:text-green-600 transition-colors">+212 587 654 321</a></p>
                  </div>
                </li>
                <li className="flex">
                  <Mail className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p><a href="mailto:info@monauberge.com" className="hover:text-green-600 transition-colors">info@monauberge.com</a></p>
                    <p><a href="mailto:reservations@monauberge.com" className="hover:text-green-600 transition-colors">reservations@monauberge.com</a></p>
                  </div>
                </li>
                <li className="flex">
                  <Clock className="h-6 w-6 text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Horaires de Réception</p>
                    <p>Ouvert 24h/24, 7j/7</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="section-subtitle">Comment nous trouver</h3>
              <p className="mb-4">
                Mon Auberge est située directement sur la plage d'Imsouane, à environ 80 km au nord d'Agadir et 25 km au sud de Taghazout.
              </p>
              <h4 className="font-medium text-lg mb-2">Depuis Agadir :</h4>
              <p className="mb-3">
                Prenez la route côtière N1 en direction de Essaouira. Après environ 70 km, suivez les indications pour Imsouane. Une fois au village, descendez vers la plage et vous nous trouverez sur votre gauche.
              </p>
              <h4 className="font-medium text-lg mb-2">Depuis Marrakech :</h4>
              <p>
                Prenez la route N8 en direction d'Essaouira, puis la N1 en direction d'Agadir. Après Tamri, suivez les indications pour Imsouane. Une fois au village, descendez vers la plage.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="section-subtitle">Envoyez-nous un message</h3>
            <ContactForm />
            
            <div className="mt-8">
              <h3 className="section-subtitle">Notre emplacement</h3>
              <div className="rounded-lg overflow-hidden shadow-md h-[300px]">
                {/* Carte interactive (iframe Google Maps) */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3332.1715049478075!2d-9.825945383308223!3d30.85206055911041!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb25e878ccbe645%3A0xedc6b27c99320eee!2sPlage%20d&#39;Imsouane!5e1!3m2!1sfr!2sfr!4v1746095006956!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte de Mon Auberge à Imsouane"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      <SectionContainer
        bgColor="bg-blue-50"
        title="À Propos de Mon Auberge"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Fondée en 2015 par deux passionnés de surf et de voyage, Mon Auberge est née de l'amour pour le village d'Imsouane et sa célèbre baie, l'un des meilleurs spots de surf du Maroc.
            </p>
            <p className="mb-4">
              Notre mission est d'offrir un hébergement confortable et authentique où les voyageurs du monde entier peuvent se sentir comme chez eux, tout en découvrant les merveilles naturelles et culturelles de la région.
            </p>
            <p>
              Notre équipe locale est composée de personnes passionnées qui connaissent parfaitement Imsouane et ses environs. Nous sommes fiers de partager notre culture, notre cuisine et nos plus beaux spots avec nos hôtes.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
          <img 
              src="images/lit_mer.jpg" 
              alt="Petit déjeuner traditionnel" 
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
            
            <img 
            
              src="images/petit_dej2.jpg" 
              alt="Vue de la terrasse" 
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
            <img 
              src="images/merssa.jpg" 
              alt="Equipe de Mon Auberge" 
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
           
            <img 
              src="images/quad2.jpg" 
              alt="Coucher de soleil à Imsouane" 
              className="rounded-lg h-40 md:h-48 w-full object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default ContactPage;