"""
train_model.py — NexLogix Delivery Risk Model Training Script

Tech stack: Python + scikit-learn (RandomForestClassifier)

Usage:
    python training/train_model.py

The trained model is saved to app/models/risk_model.pkl.
In production, training data will come from the MySQL (AWS RDS) database.
"""

import pickle
import numpy as np
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

MODEL_OUTPUT = Path(__file__).parent.parent / "app" / "models" / "risk_model.pkl"
MODEL_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────────
# TODO: Replace synthetic data with real data fetched from MySQL (AWS RDS)
#       using SQLAlchemy:
#
#       from sqlalchemy import create_engine
#       import pandas as pd
#       engine = create_engine(os.getenv("DATABASE_URL"))
#       df = pd.read_sql("SELECT * FROM Shipments WHERE ...", engine)
# ─────────────────────────────────────────────────────────────────────────────

def generate_synthetic_data(n: int = 2000):
    """Generate synthetic shipment records for initial model development."""
    rng = np.random.default_rng(42)

    weight_kg            = rng.uniform(0.5, 100.0, n)
    distance_km          = rng.uniform(10.0, 2000.0, n)
    scheduled_days       = rng.integers(1, 15, n)
    carrier_on_time_rate = rng.uniform(0.5, 1.0, n)
    is_peak_season       = rng.choice([0, 1], n, p=[0.7, 0.3])
    weather_risk_score   = rng.uniform(0.0, 1.0, n)

    # Synthetic label: late delivery (1) based on risk factors
    risk = (
        0.15 * (distance_km / 2000)
        + 0.20 * weather_risk_score
        + 0.20 * (1 - carrier_on_time_rate)
        + 0.15 * is_peak_season
        + 0.05 * (weight_kg / 100)
    )
    labels = (risk + rng.uniform(-0.1, 0.1, n) > 0.35).astype(int)

    X = np.column_stack([
        weight_kg, distance_km, scheduled_days,
        carrier_on_time_rate, is_peak_season, weather_risk_score
    ])
    return X, labels


def train():
    print("── NexLogix ML: Training delivery risk model ──────────────────")
    X, y = generate_synthetic_data(n=2000)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", RandomForestClassifier(
            n_estimators=200,
            max_depth=8,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1,
        )),
    ])

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=["On-Time", "Late/Failed"]))

    with open(MODEL_OUTPUT, "wb") as f:
        pickle.dump(pipeline, f)

    print(f"\n✓ Model saved to {MODEL_OUTPUT}")


if __name__ == "__main__":
    train()
