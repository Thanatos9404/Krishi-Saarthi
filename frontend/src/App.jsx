import React, { useState, useEffect } from 'react';
import { Sprout, BarChart3, Lightbulb, TrendingUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScenarioComparison from './components/ScenarioComparison';
import RecommendationPanel from './components/RecommendationPanel';
import farmingApi from './api/farmingApi';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [crops, setCrops] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);

  const [formData, setFormData] = useState({
    crop: 'Rice',
    soil_type: 'Alluvial',
    area_hectares: 2.0,
    seed_quality: 0.75,
    expected_rainfall: 800,
    rainfall_delay: 0,
    irrigation_frequency: 4,
    fertilizer_mix: {
      Urea: 100,
      DAP: 50,
      MOP: 40,
      NPK: 0,
      Organic: 20
    },
    pest_probability: 0.2,
    labour_days: 30,
    pest_control_intensity: 0.6,
    sale_month: 2,
    current_market_price: 2500,
    seed_quantity_kg: 100
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [cropsRes, soilsRes] = await Promise.all([
        farmingApi.getCrops(),
        farmingApi.getSoilTypes()
      ]);
      setCrops(cropsRes.crops || []);
      setSoilTypes(soilsRes.soil_types || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
      // Set defaults if API fails
      setCrops(['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane']);
      setSoilTypes(['Alluvial', 'Black', 'Red', 'Laterite', 'Desert']);
    }
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      // Run all three API calls
      const [simRes, compRes, recRes] = await Promise.all([
        farmingApi.simulate(formData, 500),
        farmingApi.compareScenarios(formData, 500),
        farmingApi.getRecommendations(formData)
      ]);

      setSimulationData(simRes.data);
      setComparisonData(compRes.data);
      setRecommendationData(recRes.data);
      
      // Switch to dashboard tab after simulation
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Simulation error:', error);
      alert('Error running simulation. Please check if the backend server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-green-50 via-earth-brown-50 to-sky-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-farm-green-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-farm-green-500 to-farm-green-600 p-3 rounded-xl mr-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  KrishiSaarthi
                </h1>
                <p className="text-sm text-gray-600">AI Farm Decision Simulator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="bg-farm-green-100 px-4 py-2 rounded-lg">
                <p className="text-xs text-farm-green-700 font-semibold">
                  🌾 Smart Farming • 📊 Data-Driven • 🤖 AI-Powered
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            <TabButton
              icon={BarChart3}
              label="Dashboard"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <TabButton
              icon={TrendingUp}
              label="Scenario Comparison"
              active={activeTab === 'comparison'}
              onClick={() => setActiveTab('comparison')}
            />
            <TabButton
              icon={Lightbulb}
              label="AI Recommendations"
              active={activeTab === 'recommendations'}
              onClick={() => setActiveTab('recommendations')}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar
            formData={formData}
            setFormData={setFormData}
            crops={crops}
            soilTypes={soilTypes}
            onSimulate={runSimulation}
            loading={loading}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <Dashboard simulationData={simulationData} />
            )}
            {activeTab === 'comparison' && (
              <ScenarioComparison comparisonData={comparisonData} />
            )}
            {activeTab === 'recommendations' && (
              <RecommendationPanel 
                recommendationData={recommendationData}
                simulationData={simulationData}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-farm-green-100 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <span className="font-semibold text-farm-green-600">KrishiSaarthi</span> - 
              Empowering Indian farmers with AI-driven decision support
            </p>
            <p className="text-xs text-gray-500">
              Built with React, FastAPI, and advanced ML models • Data-driven insights for sustainable farming
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const TabButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-6 py-4 font-semibold transition-all duration-300 border-b-4 ${
      active
        ? 'border-farm-green-500 text-farm-green-600 bg-farm-green-50'
        : 'border-transparent text-gray-600 hover:text-farm-green-600 hover:bg-gray-50'
    }`}
  >
    <Icon className="w-5 h-5 mr-2" />
    {label}
  </button>
);

export default App;
