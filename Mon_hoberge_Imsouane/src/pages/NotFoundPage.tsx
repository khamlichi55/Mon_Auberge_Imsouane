import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50">
      <div className="text-center max-w-xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-green-800 mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Non Trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="inline-flex items-center btn btn-primary">
          <ArrowLeft size={18} className="mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;