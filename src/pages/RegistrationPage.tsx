// src/pages/RegistrationPage.tsx
import React, { useState } from 'react';
import banner from '../assets/banner.png';
import { RegistrationBrochure } from '../utils/api';
import { useAlert } from '../components/AlertProvider';

const isMobile = `@media (max-width: 768px)`;

interface FormData {
  complete_name: string;
  contact_whatsapp: string;
  work_email: string;
  company_name: string;
  address: string;
  industry: string;
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    boxSizing: 'border-box' as const
  },
  bannerContainer: {
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
    [isMobile]: {
      margin: '-20px -20px 2rem -20px',
      borderRadius: '0'
    }
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    [isMobile]: {
      width: '100vw',
      objectFit: 'cover' as const
    }
  },
  formContainer: {
    background: '#FFFFFF',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    [isMobile]: {
      padding: '1rem'
    }
  },
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    [isMobile]: {
      justifyContent: 'center'
    }
  }
} as const;

const RegistrationPage: React.FC = () => {
  const { showAlert } = useAlert();
  const [form, setForm] = useState<FormData>({
    complete_name: '',
    contact_whatsapp: '',
    work_email: '',
    company_name: '',
    address: '',
    industry: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await RegistrationBrochure({
        company_name: form.company_name,
        complete_name: form.complete_name,
        contact_whatsapp: form.contact_whatsapp,
        work_email: form.work_email,
        address: form.address,
        industry: form.industry || null
      });

      setForm({
        complete_name: '',
        contact_whatsapp: '',
        work_email: '',
        company_name: '',
        address: '',
        industry: ''
      });

      console.log(form);


      await fetch(`${import.meta.env.VITE_BASE_URL_API}/api/v1/brochures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      showAlert('success', ' tersimpan!');
      window.location.href = "https://drive.google.com/drive/folders/1syBaLb_IImnpRFCIlN1QZE46M0tyZYjR?usp=sharing ";



      showAlert('success', ' tersimpan!');
    } catch (error) {
      console.error('Error saat menyimpan:', error); // Debug log
      showAlert('error', 'Gagal menyimpan, silakan coba lagi.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bannerContainer}>
        <img src={banner} alt="Lifetech Banner" style={styles.bannerImage} />
      </div>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="COMPLETE NAME*"
            name="complete_name"
            value={form.complete_name}
            onChange={handleChange}
          />
          <FormInput
            label="CONTACT WHATSAPP*"
            name="contact_whatsapp"
            type="tel"
            value={form.contact_whatsapp}
            onChange={handleChange}
            placeholder="+62 8123 456 789"
          />
          <FormInput
            label="WORK EMAIL*"
            name="work_email"
            type="email"
            value={form.work_email}
            onChange={handleChange}
            placeholder="name@company.com"
          />
          <FormInput
            label="COMPANY NAME*"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
          />
          <FormInput
            label="ADDRESS*"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <FormInput
            label="INDUSTRY"
            name="industry"
            value={form.industry}
            onChange={handleChange}
          />

          <div style={styles.submitButtonContainer}>
            <button
              type="submit"
              style={{
                width: 'clamp(200px, 30%, 300px)',
                padding: '1rem',
                backgroundColor: '#00B894',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
                >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}> = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={inputStyle}
      placeholder={placeholder}
      required={label.includes('*')}
    />
  </div>
);

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#333',
  fontWeight: 'bold',
  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '4px',
  border: '1px solid #E0E0E0',
  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
  boxSizing: 'border-box'
};

export default RegistrationPage;
