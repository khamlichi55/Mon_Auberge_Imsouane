import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Chambres', path: '/chambres' },
    { name: 'Activités', path: '/activites' },
    { name: 'Réservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo2.png"
            alt="Mon Auberge Logo"
            className={`h-10 transition-transform duration-300 ${
              isScrolled ? 'h-16 scale-125' : 'h-14 scale-100'
            }`}
          />
          <span className="text-xl font-bold text-green-800">Mon Auberge</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-green-600 border-b-2 border-green-600'
                  : `${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-green-600`
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/reservation" className="btn btn-primary ml-4">
            Réserver
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-green-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white absolute top-full left-0 w-full shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-3 font-medium ${
                    location.pathname === link.path
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/reservation" 
                className="btn btn-primary my-4 self-start"
                onClick={() => setIsOpen(false)}
              >
                Réserver
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;