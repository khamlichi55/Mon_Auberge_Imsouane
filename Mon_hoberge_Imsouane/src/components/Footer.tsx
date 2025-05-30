import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <img src="images/logo3.png" alt="" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Mon Auberge</h3>
            <p className="mb-4">Votre oasis de paix à Imsouane, offrant une expérience authentique face à l'océan.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-200 transition-colors">Accueil</Link></li>
              <li><Link to="/chambres" className="hover:text-blue-200 transition-colors">Nos Chambres</Link></li>
              <li><Link to="/activites" className="hover:text-blue-200 transition-colors">Activités</Link></li>
              <li><Link to="/reservation" className="hover:text-blue-200 transition-colors">Réservation</Link></li>
              <li><Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>Petit-déjeuner inclus</li>
              <li>Wi-Fi gratuit</li>
              <li>Location d'équipement de surf</li>
              <li>Excursions guidées</li>
              <li>Transfert aéroport</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>Plage d'Imsouane, Province d'Agadir, Maroc</span>
              </p>
              <p className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <a href="tel:+212612345678" className="hover:text-blue-200 transition-colors">+212 612 345 678</a>
              </p>
              <p className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@monauberge.com" className="hover:text-blue-200 transition-colors">info@monauberge.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm">
          <p>Développé par <a href="https://ik-abdou.vercel.app/">Ik Abdou</a></p>
          <p>&copy; {new Date().getFullYear()} Mon Auberge Imsouane. Tous droits réservés.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;