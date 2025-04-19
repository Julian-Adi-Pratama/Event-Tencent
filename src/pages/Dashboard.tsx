import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    // Cek otentikasi dan role
    if (!token || role !== 'superadmin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-white to-blue-300 px-4 relative">
      {/* Tombol logout kanan atas */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 w-40 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>

      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        Dashboard Superadmin
      </h2>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-700">Selamat datang di Dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
