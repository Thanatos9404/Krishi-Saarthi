# KrishiSaarthi – AI Farm Decision Simulator (FDS)

**Empowering Indian farmers with AI-powered decision support for optimal crop planning and profitability**

## 🌾 Overview

KrishiSaarthi is a comprehensive full-stack web application that helps Indian farmers make data-driven decisions about crop planning, cultivation strategies, and market timing. The system uses advanced simulation engines, machine learning models, and real-time market data to provide actionable insights.

### Key Features

- **🎯 AI-Powered Yield Estimation**: Multi-factor yield prediction based on soil type, rainfall, irrigation, fertilizer mix, seed quality, and pest risks
- **💰 Cost Analysis**: Comprehensive cultivation cost breakdown including seeds, fertilizers, labour, irrigation, and logistics
- **⚠️ Risk Assessment**: Intelligent risk scoring combining weather uncertainty, price volatility, pest threats, and soil compatibility
- **📈 Price Forecasting**: Time-series based market price predictions with optimal selling window recommendations
- **🔄 What-If Simulation**: Monte Carlo simulations (100-2000 scenarios) to compare farming strategies
- **🤖 Smart Recommendations**: Natural language insights explaining optimization opportunities
- **📊 Beautiful Dashboard**: Modern, responsive UI with real-time charts and agricultural aesthetics

## 🏗️ Architecture

### Backend (Python/FastAPI)
```
backend/
├── main.py                 # FastAPI application with REST endpoints
├── config.py              # Configuration and constants
├── data_loader.py         # Dataset loading and preprocessing
├── yield_estimator.py     # Yield prediction engine
├── cost_calculator.py     # Cost computation module
├── risk_engine.py         # Risk assessment system
├── price_forecaster.py    # Price forecasting (ARIMA/Prophet-inspired)
├── simulation_engine.py   # What-If Monte Carlo simulator
└── requirements.txt       # Python dependencies
```

### Frontend (React/TailwindCSS)
```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx              # Input controls
│   │   ├── Dashboard.jsx            # Main analytics view
│   │   ├── YieldChart.jsx           # Yield factors visualization
│   │   ├── RiskGauge.jsx            # Risk distribution chart
│   │   ├── PriceForecastChart.jsx   # Price predictions
│   │   ├── ScenarioComparison.jsx   # Three-plan comparison
│   │   └── RecommendationPanel.jsx  # AI insights
│   ├── api/
│   │   └── farmingApi.js            # Backend API client
│   ├── App.jsx                      # Main application
│   └── index.css                    # Tailwind styles
└── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On Linux/Mac
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment (optional):**
   ```bash
   copy .env.example .env
   # Edit .env with your API keys if needed
   ```

5. **Run the backend server:**
   ```bash
   python main.py
   ```

   Backend will be available at: `http://localhost:8000`

   API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   copy .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```

   Frontend will be available at: `http://localhost:3000`

## 📡 API Endpoints

### Core Endpoints

- **POST /simulate** - Run farming simulation with input parameters
- **POST /forecast_prices** - Forecast commodity prices for next N days
- **POST /compare_scenarios** - Compare Current vs Optimal vs Worst-case scenarios
- **POST /recommend** - Get AI-powered recommendations
- **GET /crops** - Get list of supported crops
- **GET /soils** - Get list of soil types
- **GET /fertilizers** - Get fertilizer information

### Example Request

```bash
curl -X POST http://localhost:8000/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "farming_input": {
      "crop": "Rice",
      "soil_type": "Alluvial",
      "area_hectares": 2.0,
      "seed_quality": 0.75,
      "expected_rainfall": 800,
      "rainfall_delay": 0,
      "irrigation_frequency": 4,
      "fertilizer_mix": {
        "Urea": 100,
        "DAP": 50,
        "MOP": 40
      },
      "pest_probability": 0.2,
      "current_market_price": 2500,
      "sale_month": 2
    },
    "num_simulations": 500
  }'
```

## 🎨 UI Features

### Color Palette
- **Farm Green**: Primary agricultural theme
- **Earth Brown**: Soil and natural elements
- **Sky Blue**: Weather and water elements

### Components

1. **Sidebar**: Interactive input controls with sliders, dropdowns, and numeric inputs
2. **Dashboard**: Key metrics cards with yield, cost, profit, and risk scores
3. **Charts**: 
   - Bar chart for yield impact factors
   - Pie chart for risk distribution
   - Area chart for price forecasting
4. **Scenario Cards**: Side-by-side comparison of farming strategies
5. **Recommendation Panel**: AI-generated insights in natural language

## 🧮 Simulation Models

### Yield Estimation
```
Final Yield = Base Yield × Soil Factor × Rainfall Factor × 
              Irrigation Factor × Fertilizer Factor × 
              Seed Quality Factor × Pest Factor
```

### Risk Score (0-100)
```
Risk = Weather(30%) + Price Volatility(25%) + 
       Pest Severity(25%) + Soil Mismatch(20%)
```

### Monte Carlo Simulation
- Runs 100-2000 micro-simulations
- Varies rainfall (±20%), pest probability (0-30%), fertilizer (±15%), prices (±10%)
- Generates probability distributions for profit and yield outcomes

## 📊 Datasets

The system uses real agricultural datasets:

1. **Crop Yield Data**: `All-India_-Crop-wise-Area,-Production-&-Yield.csv`
   - Historical yield data by crop, season, and year
   - Area, production, and yield statistics

2. **Market Price Data**: `9ef84268-d588-465a-a308-a864a43d0070.csv`
   - Daily wholesale commodity prices from Indian mandis
   - State, district, market, and variety-wise pricing

Additional datasets can be downloaded using:
```python
import kagglehub

# Crop yield dataset
path1 = kagglehub.dataset_download("akshatgupta7/crop-yield-in-indian-states-dataset")

# Commodity prices dataset
path2 = kagglehub.dataset_download("ishankat/daily-wholesale-commodity-prices-india-mandis")

# Mandi prices
path3 = kagglehub.dataset_download("arjunyadav99/indian-agricultural-mandi-prices-20232025")
```

## 🔧 Configuration

### Backend Configuration (`config.py`)

- **Supported Crops**: Rice, Wheat, Maize, Cotton, Sugarcane, etc.
- **Soil Types**: Alluvial, Black, Red, Laterite, Desert, Mountain, Clay, Sandy
- **Crop-Soil Compatibility Matrix**: 0-1 scale compatibility scores
- **Default Yields**: Historical average yields (kg/hectare)
- **Fertilizer NPK Ratios**: Nutrient content of different fertilizers
- **Cost Parameters**: Seed costs, irrigation rates, labour wages, etc.

## 🎯 Use Cases

1. **Pre-Season Planning**: Farmers can simulate different crop choices and strategies
2. **Resource Optimization**: Determine optimal fertilizer mix and irrigation schedule
3. **Risk Mitigation**: Understand and prepare for weather and market risks
4. **Market Timing**: Identify best selling windows based on price forecasts
5. **Investment Decisions**: Calculate expected ROI before committing resources

## 🚧 Future Enhancements

- [ ] Integration with real-time weather APIs
- [ ] GPS-based soil quality detection
- [ ] Multi-crop rotation planning
- [ ] Pest detection using computer vision
- [ ] Regional language support (Hindi, Marathi, Tamil, etc.)
- [ ] Mobile app (React Native)
- [ ] Blockchain-based crop insurance integration
- [ ] Community forum for farmer collaboration

## 📝 License

This project is built for educational and social impact purposes.

## 👥 Contributors

Built with ❤️ for Indian farmers

## 🙏 Acknowledgments

- Crop yield data from Indian agricultural datasets
- Market price data from AGMARKNET
- UI inspiration from modern agricultural tech platforms
- FastAPI and React communities

---

**Made with 🌾 for sustainable and profitable farming**
