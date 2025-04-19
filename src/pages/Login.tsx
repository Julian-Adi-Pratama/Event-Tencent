import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../components/AlertProvider'; // pastikan path sesuai
import AlertToast from '../components/AlertToast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_API}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || 'Login gagal');
      }

      
      const result = await response.json();
      console.log(result);

      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('role', result.data.role);

      showAlert('success', 'Login berhasil!');
      setFormData({ email: '', password: '' });

      // Delay sebelum redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      console.error('Login error:', error);
      setShowError(true);
      showAlert('error', error.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-white to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login Superadmin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {showError && <AlertToast type="error" message="Email atau password salah!" />}

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
                className="w-full px-4 py-2 border border-gray-300 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
