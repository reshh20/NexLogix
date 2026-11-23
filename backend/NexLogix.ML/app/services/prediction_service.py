import os
import pickle
import numpy as np
from pathlib import Path

MODEL_PATH = Path(__file__).parent.parent / "models" / "risk_model.pkl"

# Load the trained model at startup (if it exists)
_model = None
if MODEL_PATH.exists():
    with open(MODEL_PATH, "rb") as f:
        _model = pickle.load(f)


def predict_risk(
    weight_kg: float,
    distance_km: float,
    scheduled_days: int,
    carrier_on_time_rate: float,
    is_peak_season: bool,
    weather_risk_score: float,
) -> dict:
    """
    Run delivery risk inference.

    Returns a dict with risk_score, risk_level, confidence, and top_factors.
    Falls back to a heuristic rule if the model is not trained yet.
    """
    features = np.array([[
        weight_kg,
        distance_km,
        scheduled_days,
        carrier_on_time_rate,
        int(is_peak_season),
        weather_risk_score,
    ]])

    if _model is not None:
        # Real model inference
        risk_score  = float(_model.predict_proba(features)[0][1])
        confidence  = float(max(_model.predict_proba(features)[0]))
    else:
        # ── Heuristic fallback (until model is trained) ─────────────────────
        risk_score = round(
            0.2
            + (0.1 if distance_km > 500 else 0.0)
            + (0.15 if is_peak_season else 0.0)
            + (0.2 * weather_risk_score)
            + (0.15 * (1 - carrier_on_time_rate))
            + (0.05 if weight_kg > 50 else 0.0),
            4,
        )
        risk_score = min(risk_score, 1.0)
        confidence = 0.65  # fixed low confidence for heuristic

    # Classify
    if risk_score >= 0.7:
        risk_level = "High"
    elif risk_score >= 0.4:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # Factor attribution (heuristic explanation)
    top_factors = []
    if weather_risk_score > 0.5:
        top_factors.append("High weather disruption risk")
    if carrier_on_time_rate < 0.8:
        top_factors.append("Low carrier on-time rate")
    if is_peak_season:
        top_factors.append("Peak shipping season")
    if distance_km > 500:
        top_factors.append("Long-haul route")
    if not top_factors:
        top_factors.append("Standard risk profile")

    return {
        "risk_score":  risk_score,
        "risk_level":  risk_level,
        "confidence":  confidence,
        "top_factors": top_factors,
    }
