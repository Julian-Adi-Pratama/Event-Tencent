import React, { createContext, useContext, useState } from 'react';
import AlertToast from './AlertToast';

type AlertType = 'success' | 'error';

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
    show: boolean;
  }>({
    type: 'success',
    message: '',
    show: false
  });

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message, show: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert.show && (
        <AlertToast
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(prev => ({ ...prev, show: false }))}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
}; 