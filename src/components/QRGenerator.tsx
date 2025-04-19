import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logo from '../assets/logo.png';

const QRGenerator: React.FC = () => {
  const registrationUrl = `${window.location.origin}/register`;

  return (
    <div style={{ textAlign: 'center', marginTop: 100,flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center' }}>
      <h2>Scan QR Code untuk Registrasi</h2>
      <QRCodeSVG 
        value={registrationUrl} 
        size={200}
        level="H"
        imageSettings={{
          src: logo,
          
          height: 40,
          width: 40,
          excavate: true
        }}
      />
    </div>
  );
};

export default QRGenerator; 