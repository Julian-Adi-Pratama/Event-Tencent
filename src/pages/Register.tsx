import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAlert } from '../components/AlertProvider'; // pastikan path sesuai
import AlertToast from '../components/AlertToast';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Menambahkan state untuk melacak status registrasi berhasil

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_API}/api/v1/auth/register-superadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || 'Gagal registrasi';
        if (message.toLowerCase().includes('exist') || message.toLowerCase().includes('sudah ada')) {
          showAlert('error', 'Gagal Registrasi, Akun Sudah Ada');
        } else {
          showAlert('error', message);
        }
        return; // Jika ada error, hentikan eksekusi lebih lanjut
      }

      console.log('Register success:', data);
      setIsSuccess(true); // Set status registrasi berhasil
      setFormData({ username: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error: any) {
      console.error('Register error:', error);
      showAlert('error', error.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-white to-green-300 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Register Superadmin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* AlertToast hanya akan tampil jika registrasi berhasil */}
          {isSuccess && <AlertToast type="success" message="Registrasi berhasil!" />}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
