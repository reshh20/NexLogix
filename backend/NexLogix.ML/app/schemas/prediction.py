from pydantic import BaseModel, Field
from typing import Optional


class PredictionRequest(BaseModel):
    """Input features for the delivery risk model."""
    shipment_id: int
    weight_kg: float = Field(..., gt=0, description="Package weight in kilograms")
    distance_km: float = Field(..., gt=0, description="Route distance in kilometres")
    scheduled_days: int = Field(..., ge=1, description="Days scheduled for delivery")
    carrier_on_time_rate: float = Field(..., ge=0.0, le=1.0, description="Historical on-time rate [0,1]")
    is_peak_season: bool = Field(False, description="Whether it's a peak shipping season")
    weather_risk_score: float = Field(0.0, ge=0.0, le=1.0, description="Weather disruption score [0,1]")


class PredictionResponse(BaseModel):
    """Delivery risk prediction result."""
    shipment_id: int
    risk_score: float = Field(..., description="Probability of late/failed delivery [0,1]")
    risk_level: str = Field(..., description="Low | Medium | High")
    confidence: float = Field(..., description="Model confidence [0,1]")
    top_factors: list[str] = Field(default_factory=list, description="Key contributing risk factors")
