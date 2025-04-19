// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QRGenerator from './components/QRGenerator';
import RegistrationPage from './pages/RegistrationPage';
import { AlertProvider } from './components/AlertProvider';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: string;
}

const ProtectedRoute = ({ children, roleRequired }: ProtectedRouteProps) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (!token || (roleRequired && role !== roleRequired)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QRGenerator />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roleRequired="superadmin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AlertProvider>
  );
};

export default App;
