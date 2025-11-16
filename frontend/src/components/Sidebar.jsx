import React from 'react';
import { Sprout, Leaf, Cloud, Droplets, Bug, Calendar } from 'lucide-react';

const Sidebar = ({ formData, setFormData, crops, soilTypes, onSimulate, loading }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFertilizerChange = (fertilizer, value) => {
    setFormData(prev => ({
      ...prev,
      fertilizer_mix: {
        ...prev.fertilizer_mix,
        [fertilizer]: parseFloat(value) || 0
      }
    }));
  };

  return (
    <div className="w-full lg:w-96 bg-white rounded-2xl shadow-xl p-6 space-y-6 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-farm-green-100">
        <div className="flex items-center justify-center mb-2">
          <Sprout className="w-8 h-8 text-farm-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-farm-green-800">Farm Inputs</h2>
        </div>
        <p className="text-sm text-gray-600">Configure your farming parameters</p>
      </div>

      {/* Crop Selection */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Leaf className="w-4 h-4 mr-2 text-farm-green-600" />
          Crop Type
        </label>
        <select
          value={formData.crop}
          onChange={(e) => handleChange('crop', e.target.value)}
          className="input-farm"
        >
          <option value="">Select Crop</option>
          {crops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </div>

      {/* Soil Type */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Leaf className="w-4 h-4 mr-2 text-earth-brown-600" />
          Soil Type
        </label>
        <select
          value={formData.soil_type}
          onChange={(e) => handleChange('soil_type', e.target.value)}
          className="input-farm"
        >
          <option value="">Select Soil</option>
          {soilTypes.map(soil => (
            <option key={soil} value={soil}>{soil}</option>
          ))}
        </select>
      </div>

      {/* Area */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Cultivation Area (hectares)
        </label>
        <input
          type="number"
          value={formData.area_hectares}
          onChange={(e) => handleChange('area_hectares', parseFloat(e.target.value))}
          min="0.1"
          step="0.1"
          className="input-farm"
        />
      </div>

      {/* Seed Quality */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Seed Quality: {(formData.seed_quality * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          value={formData.seed_quality}
          onChange={(e) => handleChange('seed_quality', parseFloat(e.target.value))}
          min="0"
          max="1"
          step="0.05"
          className="w-full h-2 bg-farm-green-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>

      {/* Rainfall */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Cloud className="w-4 h-4 mr-2 text-sky-blue-600" />
          Expected Rainfall (mm)
        </label>
        <input
          type="number"
          value={formData.expected_rainfall}
          onChange={(e) => handleChange('expected_rainfall', parseFloat(e.target.value))}
          min="0"
          className="input-farm"
        />
      </div>

      {/* Rainfall Delay */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Calendar className="w-4 h-4 mr-2 text-sky-blue-600" />
          Monsoon Delay (days)
        </label>
        <input
          type="number"
          value={formData.rainfall_delay}
          onChange={(e) => handleChange('rainfall_delay', parseInt(e.target.value))}
          min="0"
          className="input-farm"
        />
      </div>

      {/* Irrigation */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Droplets className="w-4 h-4 mr-2 text-sky-blue-600" />
          Irrigation Frequency (per month)
        </label>
        <input
          type="number"
          value={formData.irrigation_frequency}
          onChange={(e) => handleChange('irrigation_frequency', parseInt(e.target.value))}
          min="0"
          className="input-farm"
        />
      </div>

      {/* Fertilizers */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Fertilizer Mix (kg/hectare)
        </label>
        <div className="bg-farm-green-50 rounded-xl p-4 space-y-3">
          {['Urea', 'DAP', 'MOP', 'NPK', 'Organic'].map(fert => (
            <div key={fert} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">{fert}</span>
              <input
                type="number"
                value={formData.fertilizer_mix[fert] || 0}
                onChange={(e) => handleFertilizerChange(fert, e.target.value)}
                min="0"
                className="w-24 px-3 py-1 border-2 border-farm-green-200 rounded-lg focus:border-farm-green-500 outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pest Probability */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Bug className="w-4 h-4 mr-2 text-red-600" />
          Pest Attack Risk: {(formData.pest_probability * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          value={formData.pest_probability}
          onChange={(e) => handleChange('pest_probability', parseFloat(e.target.value))}
          min="0"
          max="1"
          step="0.05"
          className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Market Price */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Current Market Price (₹/quintal)
        </label>
        <input
          type="number"
          value={formData.current_market_price}
          onChange={(e) => handleChange('current_market_price', parseFloat(e.target.value))}
          min="0"
          className="input-farm"
        />
      </div>

      {/* Sale Month */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Planned Sale Month (0-12)
        </label>
        <input
          type="number"
          value={formData.sale_month}
          onChange={(e) => handleChange('sale_month', parseInt(e.target.value))}
          min="0"
          max="12"
          className="input-farm"
        />
      </div>

      {/* Simulate Button */}
      <button
        onClick={onSimulate}
        disabled={loading}
        className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Running Simulation...
          </div>
        ) : (
          <>
            <Sprout className="w-5 h-5 mr-2" />
            Run Simulation
          </>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
