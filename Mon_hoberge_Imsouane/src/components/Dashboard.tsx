import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaRunning } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Espace Admin</h1>
        <p className="text-gray-500 mb-10">Gérez les contenus de votre site</p>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate('/rooms')}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow"
          >
            <FaBed className="text-xl" />
            Gérer les Chambres
          </button>

          <button
            onClick={() => navigate('/activitiesadd')}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow"
          >
            <FaRunning className="text-xl" />
            Gérer les Activités
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
