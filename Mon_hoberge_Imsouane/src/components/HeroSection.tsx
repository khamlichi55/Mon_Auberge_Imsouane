import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  fullHeight?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  showButton = true,
  buttonText = 'Réserver maintenant',
  buttonLink = '/reservation',
  fullHeight = true,
}) => {
  return (
    <div 
      className={`relative ${fullHeight ? 'h-screen' : 'h-[60vh]'} flex items-center justify-center text-center text-white`}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 font-light">{subtitle}</p>
          )}
          
          {showButton && (
            <Link 
              to={buttonLink} 
              className="btn btn-primary text-lg px-8 py-3"
            >
              {buttonText}
            </Link>
          )}
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a 
            href="#content" 
            className="text-white flex flex-col items-center"
            aria-label="Défiler vers le bas"
          >
            <span className="text-sm mb-2">Découvrir</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;