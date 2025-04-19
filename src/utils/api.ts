const BASE_URL = import.meta.env.VITE_BASE_URL_API;

interface Brouchure {
  complete_name: string;
  contact_whatsapp: string;
  work_email: string;
  company_name: string;
  address: string;
  industry: string | null;
}

async function RegistrationBrochure(data: Brouchure) {
  try {
    const response = await fetch(BASE_URL + '/api/v1/brochures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data');
    }

    const result = await response.json();
    console.log('Data berhasil diambil:', result);
    return result;
  } catch (error) {
    console.error('Terjadi error:', error);
    throw error; // Ini yang bikin alert error akhirnya bisa muncul
  }
}

export { RegistrationBrochure };
