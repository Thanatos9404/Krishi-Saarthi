"""Risk assessment and scoring engine"""
import numpy as np
from typing import Dict
import config
from data_loader import DataLoader

class RiskEngine:
    """Assess farming risks and generate risk scores"""
    
    def __init__(self):
        self.data_loader = DataLoader()
    
    def calculate_risk_score(
        self,
        crop: str,
        soil_type: str,
        expected_rainfall: float,
        rainfall_delay: int,
        pest_probability: float,
        price_statistics: Dict,
        yield_confidence: float
    ) -> Dict:
        """
        Calculate comprehensive risk score (0-100, higher = more risky)
        Combines weather, price, pest, and soil factors
        """
        # Individual risk components
        weather_risk = self._calculate_weather_risk(expected_rainfall, rainfall_delay)
        price_risk = self._calculate_price_risk(price_statistics)
        pest_risk = self._calculate_pest_risk(pest_probability)
        soil_risk = self._calculate_soil_risk(crop, soil_type)
        
        # Weighted composite risk score
        composite_risk = (
            weather_risk * config.RISK_WEIGHTS["weather_uncertainty"] +
            price_risk * config.RISK_WEIGHTS["price_volatility"] +
            pest_risk * config.RISK_WEIGHTS["pest_severity"] +
            soil_risk * config.RISK_WEIGHTS["soil_mismatch"]
        )
        
        # Adjust for yield confidence (low confidence = higher risk)
        confidence_penalty = (1 - yield_confidence) * 10
        final_risk = min(100, composite_risk + confidence_penalty)
        
        # Risk category
        risk_category = self._categorize_risk(final_risk)
        
        # Generate risk insights
        insights = self._generate_risk_insights(
            weather_risk, price_risk, pest_risk, soil_risk, risk_category
        )
        
        return {
            "overall_risk_score": round(final_risk, 2),
            "risk_category": risk_category,
            "components": {
                "weather_risk": round(weather_risk, 2),
                "price_volatility_risk": round(price_risk, 2),
                "pest_attack_risk": round(pest_risk, 2),
                "soil_mismatch_risk": round(soil_risk, 2)
            },
            "insights": insights
        }
    
    def _calculate_weather_risk(self, rainfall: float, delay: int) -> float:
        """Weather uncertainty risk (0-100)"""
        # Rainfall adequacy risk
        if 600 <= rainfall <= 1200:
            rainfall_risk = 20  # Good rainfall
        elif 400 <= rainfall < 600 or 1200 < rainfall <= 1500:
            rainfall_risk = 40  # Moderate
        elif 200 <= rainfall < 400 or 1500 < rainfall <= 2000:
            rainfall_risk = 60  # High risk
        else:
            rainfall_risk = 80  # Very high risk
        
        # Delay risk (each day adds risk)
        delay_risk = min(40, delay * 2)  # Max 40 points from delay
        
        return min(100, rainfall_risk + delay_risk)
    
    def _calculate_price_risk(self, price_stats: Dict) -> float:
        """Market price volatility risk (0-100)"""
        volatility = price_stats.get("volatility", 0.25)
        
        # Convert volatility to risk score
        # Low volatility (< 15%) = low risk
        # High volatility (> 40%) = high risk
        if volatility < 0.15:
            return 20
        elif volatility < 0.25:
            return 40
        elif volatility < 0.35:
            return 60
        else:
            return 80
    
    def _calculate_pest_risk(self, pest_probability: float) -> float:
        """Pest attack risk (0-100)"""
        # Direct mapping of probability to risk
        return pest_probability * 100
    
    def _calculate_soil_risk(self, crop: str, soil_type: str) -> float:
        """Soil compatibility risk (0-100)"""
        # Get compatibility score
        compatibility = 0.7  # Default
        
        if crop in config.CROP_SOIL_COMPATIBILITY:
            if soil_type in config.CROP_SOIL_COMPATIBILITY[crop]:
                compatibility = config.CROP_SOIL_COMPATIBILITY[crop][soil_type]
        
        # Convert to risk (inverse relationship)
        # High compatibility (>0.8) = low risk (20)
        # Low compatibility (<0.5) = high risk (80)
        risk = (1 - compatibility) * 100
        return risk
    
    def _categorize_risk(self, score: float) -> str:
        """Categorize risk score into levels"""
        if score < 25:
            return "Low Risk"
        elif score < 50:
            return "Moderate Risk"
        elif score < 70:
            return "High Risk"
        else:
            return "Very High Risk"
    
    def _generate_risk_insights(
        self, 
        weather: float, 
        price: float, 
        pest: float, 
        soil: float,
        category: str
    ) -> list:
        """Generate human-readable risk insights"""
        insights = []
        
        # Weather insights
        if weather > 60:
            insights.append("⚠️ High weather uncertainty due to inadequate or excess rainfall patterns")
        elif weather > 40:
            insights.append("🌦️ Moderate weather risk - consider contingency irrigation plans")
        else:
            insights.append("✅ Weather conditions appear favorable")
        
        # Price insights
        if price > 60:
            insights.append("📊 High market price volatility detected - timing of sale is critical")
        elif price > 40:
            insights.append("💹 Moderate price fluctuations expected in market")
        else:
            insights.append("✅ Stable market prices expected")
        
        # Pest insights
        if pest > 60:
            insights.append("🐛 Significant pest threat - invest in preventive pest management")
        elif pest > 30:
            insights.append("🦟 Moderate pest risk - monitor crop health regularly")
        else:
            insights.append("✅ Low pest risk for this season")
        
        # Soil insights
        if soil > 60:
            insights.append("🌱 Soil compatibility is poor - consider alternative crops or soil amendments")
        elif soil > 40:
            insights.append("🌾 Soil is moderately suitable - optimize fertilizer usage")
        else:
            insights.append("✅ Excellent soil compatibility for this crop")
        
        return insights
