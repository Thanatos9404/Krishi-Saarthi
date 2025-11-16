"""Configuration settings for KrishiSaarthi backend"""
import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR.parent / "datasets"
MODELS_DIR = BASE_DIR / "models"

# API Configuration
API_KEY = os.getenv("API_KEY", "579b464db66ec23bdd0000019e4dba64f69842d1547080c5536593c7")

# Crop configurations
CROPS = [
    "Rice", "Wheat", "Maize", "Barley", "Bajra", "Jowar", "Ragi",
    "Tur", "Gram", "Urad", "Moong", "Lentil", "Cotton", "Sugarcane",
    "Groundnut", "Soybean", "Sunflower", "Potato", "Onion", "Tomato"
]

SOIL_TYPES = [
    "Alluvial", "Black", "Red", "Laterite", "Desert", "Mountain", "Clay", "Sandy"
]

SEASONS = ["Kharif", "Rabi", "Summer"]

# Crop-Soil compatibility matrix (0-1 scale)
CROP_SOIL_COMPATIBILITY = {
    "Rice": {"Alluvial": 0.95, "Black": 0.7, "Red": 0.6, "Laterite": 0.5, "Desert": 0.2, "Mountain": 0.4, "Clay": 0.9, "Sandy": 0.3},
    "Wheat": {"Alluvial": 0.9, "Black": 0.85, "Red": 0.7, "Laterite": 0.5, "Desert": 0.3, "Mountain": 0.6, "Clay": 0.8, "Sandy": 0.4},
    "Maize": {"Alluvial": 0.85, "Black": 0.9, "Red": 0.8, "Laterite": 0.6, "Desert": 0.4, "Mountain": 0.7, "Clay": 0.75, "Sandy": 0.5},
    "Cotton": {"Alluvial": 0.8, "Black": 0.95, "Red": 0.75, "Laterite": 0.6, "Desert": 0.5, "Mountain": 0.5, "Clay": 0.85, "Sandy": 0.6},
    "Sugarcane": {"Alluvial": 0.9, "Black": 0.85, "Red": 0.7, "Laterite": 0.6, "Desert": 0.3, "Mountain": 0.5, "Clay": 0.8, "Sandy": 0.4},
}

# Default crop parameters (kg/hectare for yield)
DEFAULT_YIELDS = {
    "Rice": 2899, "Wheat": 3587, "Maize": 3518, "Barley": 3049,
    "Bajra": 1507, "Jowar": 1225, "Ragi": 1492, "Tur": 823,
    "Gram": 1180, "Urad": 697, "Moong": 685, "Lentil": 1038,
    "Cotton": 500, "Sugarcane": 75000, "Groundnut": 1800,
    "Soybean": 1200, "Sunflower": 800, "Potato": 22000,
    "Onion": 18000, "Tomato": 25000
}

# Fertilizer types and their NPK ratios
FERTILIZERS = {
    "Urea": {"N": 46, "P": 0, "K": 0, "cost_per_kg": 6},
    "DAP": {"N": 18, "P": 46, "K": 0, "cost_per_kg": 27},
    "MOP": {"N": 0, "P": 0, "K": 60, "cost_per_kg": 17},
    "NPK": {"N": 12, "P": 32, "K": 16, "cost_per_kg": 22},
    "Organic": {"N": 5, "P": 3, "K": 2, "cost_per_kg": 8},
}

# Cost parameters (INR)
COST_PARAMS = {
    "seed_cost_per_kg": {"Rice": 40, "Wheat": 25, "Maize": 35, "Cotton": 800, "default": 50},
    "irrigation_cost_per_mm": 15,  # per hectare per mm of water
    "labour_cost_per_day": 400,
    "pesticide_cost_base": 2500,  # per hectare
    "market_fee_percent": 2.5,
    "logistics_cost_per_quintal": 50,
}

# Risk weights
RISK_WEIGHTS = {
    "weather_uncertainty": 0.30,
    "price_volatility": 0.25,
    "pest_severity": 0.25,
    "soil_mismatch": 0.20,
}

# Simulation parameters
SIMULATION_PARAMS = {
    "num_simulations": 500,  # Default number of micro-simulations
    "rainfall_variance": 0.20,  # ±20%
    "temperature_variance": 0.10,  # ±10%
    "pest_prob_range": (0, 0.30),  # 0-30%
    "fertilizer_variance": 0.15,  # ±15%
}
