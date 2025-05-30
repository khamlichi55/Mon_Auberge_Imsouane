import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Coffee, Wifi, Moon } from 'lucide-react';

interface Amenity {
  icon: React.ReactNode;
  text: string;
}

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  imageSrc: string;
  amenities: Amenity[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  description,
  price,
  capacity,
  imageSrc,
  amenities,
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="image-hover relative h-56 md:h-64">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {price} €/nuit
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-green-800">{name}</h3>
        
        <div className="flex items-center mb-3 text-gray-600">
          <Users size={18} className="mr-1" />
          <span className="text-sm">{capacity} personne{capacity > 1 ? 's' : ''}</span>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <span className="mr-2">{amenity.icon}</span>
              <span className="text-sm">{amenity.text}</span>
            </div>
          ))}
        </div>
        
        <Link 
          to={`/reservation?room=${id}`} 
          className="btn btn-outline w-full mt-auto group-hover:bg-green-600 group-hover:text-white"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;