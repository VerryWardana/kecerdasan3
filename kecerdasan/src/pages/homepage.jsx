import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <section className="bg-gradient-to-r from-teal-100 via-white to-teal-100 min-h-screen flex items-center justify-center">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-700 drop-shadow-sm animate-fadeIn">
          Cek Risiko <span className="text-rose-500">Diabetes Anda</span> Sekarang
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600">
          Dapatkan analisa kesehatan berbasis AI untuk deteksi dini diabetes dan saran pencegahannya.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/input">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300">
              Mulai Pemeriksaan
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-white border border-teal-500 text-teal-600 px-6 py-3 rounded-full font-medium shadow-sm hover:bg-teal-50 transition duration-300">
              Pelajari Lebih Lanjut
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Homepage;