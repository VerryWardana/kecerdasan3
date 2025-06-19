import React, { useState } from 'react';

const Diabetes = () => {
  const [values, setValues] = useState({
    age: 0,
    gender: 'Male',
    hypertension: 0,
    heart_disease: 0,
    smoking_history: 'never',
    bmi: 0,
    HbA1c_level: 0,
    blood_glucose_level: 0
  });

  const [result, setResult] = useState(null);
  const [percentages, setPercentages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, field) => {
    if (['age', 'bmi', 'HbA1c_level', 'blood_glucose_level'].includes(field)) {
      setValues({ ...values, [field]: parseFloat(e.target.value) || 0 });
    } else if (['hypertension', 'heart_disease'].includes(field)) {
      setValues({ ...values, [field]: parseInt(e.target.value) || 0 });
    } else {
      setValues({ ...values, [field]: e.target.value });
    }
  };

  const predict = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      setResult(data.prediction);
      setPercentages({ positive: data.percent_positive, negative: data.percent_negative });
    } catch (error) {
      setResult("❌ Terjadi error saat memproses prediksi");
      setPercentages(null);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setValues({ age: 0, gender: 'Male', hypertension: 0, heart_disease: 0, smoking_history: 'never', bmi: 0, HbA1c_level: 0, blood_glucose_level: 0 });
    setResult(null);
    setPercentages(null);
  };

  const getBMICategory = (bmi) => (bmi < 18.5 ? "Kurus" : bmi < 25 ? "Normal" : bmi < 30 ? "Kegemukan" : "Obesitas");
  const getHbA1cCategory = (level) => (level < 5.7 ? "Normal" : level < 6.5 ? "Prediabetes" : "Diabetes");
  const getGlucoseCategory = (level) => (level < 100 ? "Normal" : level < 126 ? "Prediabetes" : "Diabetes");

  const isPositive = result && result.includes('POSITIF');
  const riskLevel = percentages ? percentages.positive : 0;

  const getRiskColor = () => {
    if (riskLevel < 30) return 'text-green-600';
    if (riskLevel < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = () => {
    if (riskLevel < 30) return 'bg-green-100 border-green-200';
    if (riskLevel < 70) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  return (
    <section className="bg-gradient-to-r from-teal-100 via-white to-teal-100 min-h-screen py-19 px- flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-teal-600 text-center mb-6">Formulir Pemeriksaan Diabetes</h2>
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Form Section */}
          <div className="space-y-4">
            {/* Age and Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Umur *</label>
                <input type="number" value={values.age} onChange={(e) => handleChange(e, 'age')} min="0" max="120" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"/>
              </div>
              <div>
                <label className="font-medium text-gray-700">Jenis Kelamin *</label>
                <select value={values.gender} onChange={(e) => handleChange(e, 'gender')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Medical History */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Riwayat Hipertensi</label>
                <select value={values.hypertension} onChange={(e) => handleChange(e, 'hypertension')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                  <option value={0}>Tidak Ada</option>
                  <option value={1}>Ada Riwayat</option>
                </select>
              </div>
              <div>
                <label className="font-medium text-gray-700">Riwayat Penyakit Jantung</label>
                <select value={values.heart_disease} onChange={(e) => handleChange(e, 'heart_disease')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                  <option value={0}>Tidak Ada</option>
                  <option value={1}>Ada Riwayat</option>
                </select>
              </div>
            </div>

            {/* Smoking History */}
            <div>
              <label className="font-medium text-gray-700">Riwayat Merokok</label>
              <select value={values.smoking_history} onChange={(e) => handleChange(e, 'smoking_history')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="never">Tidak Pernah</option>
                <option value="No Info">Pasif</option>
                <option value="former">Mantan Perokok</option>
                <option value="current">Perokok Aktif</option>
                <option value="ever">Pernah Merokok</option>
                <option value="not current">Bukan Perokok Saat Ini</option>
              </select>
            </div>

            {/* BMI */}
            <div>
              <label className="font-medium text-gray-700">BMI (kg/m²) *</label>
              <input type="number" step="0.1" value={values.bmi} onChange={(e) => handleChange(e, 'bmi')} min="10" max="60" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"/>
              {values.bmi > 0 && <p className="text-sm text-gray-500">Kategori: {getBMICategory(values.bmi)}</p>}
            </div>

            {/* Lab Results */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">HbA1c Level *</label>
                <input type="number" step="0.1" value={values.HbA1c_level} onChange={(e) => handleChange(e, 'HbA1c_level')} min="3" max="15" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"/>
                {values.HbA1c_level > 0 && <p className="text-sm text-gray-500">Status: {getHbA1cCategory(values.HbA1c_level)}</p>}
              </div>
              <div>
                <label className="font-medium text-gray-700">Glukosa Darah (mg/dL) *</label>
                <input type="number" value={values.blood_glucose_level} onChange={(e) => handleChange(e, 'blood_glucose_level')} min="50" max="500" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"/>
                {values.blood_glucose_level > 0 && <p className="text-sm text-gray-500">Status: {getGlucoseCategory(values.blood_glucose_level)}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button onClick={predict} disabled={isLoading} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50">{isLoading ? 'Menganalisis...' : '🔍 Prediksi Risiko'}</button>
              <button onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">🔄 Reset</button>
            </div>
          </div>

          {/* Result Section - IMPROVED */}
          <div className="flex flex-col justify-center">
            {isLoading ? (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-blue-700 font-medium">Model AI sedang menganalisis data Anda...</p>
                  <p className="text-blue-600 text-sm mt-2">Mohon tunggu sebentar</p>
                </div>
              </div>
            ) : result ? (
              <div className={`rounded-xl p-8 border-2 ${getRiskBgColor()} shadow-lg`}>
                <div className="text-center">
                  {/* Status Icon */}
                  <div className="mb-4">
                    <div className={`text-6xl ${isPositive ? 'animate-pulse' : ''}`}>
                      {isPositive ? '⚠️' : '✅'}
                    </div>
                  </div>

                  {/* Main Result */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Hasil Prediksi</h3>
                    <div className={`text-lg font-semibold p-3 rounded-lg ${isPositive ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                      {result}
                    </div>
                  </div>

                  {/* Percentage Display */}
                  {percentages && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-700">Tingkat Risiko</h4>
                      
                      {/* Risk Percentage Bar */}
                      <div className="bg-gray-200 rounded-full h-6 mb-4">
                        <div 
                          className={`h-6 rounded-full transition-all duration-500 ${
                            riskLevel < 30 ? 'bg-green-500' : 
                            riskLevel < 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${riskLevel}%` }}
                        ></div>
                      </div>

                      {/* Percentage Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-600">{percentages.negative}%</div>
                          <div className="text-green-700 font-medium">Sehat</div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="text-2xl font-bold text-red-600">{percentages.positive}%</div>
                          <div className="text-red-700 font-medium">Berisiko</div>
                        </div>
                      </div>


                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">🩺</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Siap untuk Analisis</h3>
                  <p className="text-gray-600">Lengkapi formulir di sebelah kiri untuk mendapatkan prediksi risiko diabetes berdasarkan AI</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>✓ Analisis menggunakan Machine Learning</p>
                    <p>✓ Hasil instan dan akurat</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Diabetes;