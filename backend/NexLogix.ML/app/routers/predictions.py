from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import predict_risk

router = APIRouter(prefix="/predict", tags=["Predictions"])


@router.post("/", response_model=PredictionResponse, summary="Predict delivery risk (full features)")
def predict(request: PredictionRequest):
    """
    Accept shipment features and return a delivery risk prediction.
    Called by the ASP.NET Core API which proxies results to the React frontend.
    """
    result = predict_risk(
        weight_kg            = request.weight_kg,
        distance_km          = request.distance_km,
        scheduled_days       = request.scheduled_days,
        carrier_on_time_rate = request.carrier_on_time_rate,
        is_peak_season       = request.is_peak_season,
        weather_risk_score   = request.weather_risk_score,
    )
    return PredictionResponse(shipment_id=request.shipment_id, **result)


@router.get("/{shipment_id}", response_model=PredictionResponse, summary="Predict risk by shipment ID")
def predict_by_id(shipment_id: int):
    """
    Lightweight endpoint called by the C# PredictionsController proxy.
    In production this will look up the shipment's features from the DB.
    For now it uses default values and returns a heuristic result.
    """
    # TODO: query MySQL via SQLAlchemy to fetch real shipment features
    result = predict_risk(
        weight_kg            = 10.0,
        distance_km          = 300.0,
        scheduled_days       = 3,
        carrier_on_time_rate = 0.85,
        is_peak_season       = False,
        weather_risk_score   = 0.1,
    )
    return PredictionResponse(shipment_id=shipment_id, **result)
