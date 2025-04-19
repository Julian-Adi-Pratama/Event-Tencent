import React, { useEffect, useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertToastProps {
  type?: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const typeColors = {
  success: '#00B894',
  error: '#FF6B6B',
  warning: '#F1C40F',
  info: '#3498DB',
};

const AlertToast: React.FC<AlertToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    // Start enter animation
    requestAnimationFrame(() => {
      setIsShown(true);
    });

    const timer = setTimeout(() => {
      setIsShown(false);
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: isShown ? 0 : -100,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    zIndex: 9999,
    pointerEvents: 'none',
    transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const alertStyle: React.CSSProperties = {
    backgroundColor: typeColors[type],
    color: 'white',
    padding: '12px 32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '320px',
    maxWidth: '90%',
    pointerEvents: 'auto',
  };

  const messageStyle: React.CSSProperties = {
    margin: 0,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={alertStyle}>
        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
};

export default AlertToast;
