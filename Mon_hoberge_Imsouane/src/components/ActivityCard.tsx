import React from 'react';
import { Clock, Calendar } from 'lucide-react';

interface ActivityCardProps {
  name: string;
  description: string;
  price: number;
  duration: string;
  imageSrc: string;
  onBooking: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  description,
  price,
  duration,
  imageSrc,
  onBooking,
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="image-hover relative h-56 md:h-64">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {price} €
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{name}</h3>
        
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span className="text-sm">Disponible toute l'année</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <button 
          onClick={onBooking}
          className="btn btn-secondary w-full mt-auto group-hover:bg-blue-600"
        >
          Réserver cette activité
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;