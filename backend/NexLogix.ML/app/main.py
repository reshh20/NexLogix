from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predictions

app = FastAPI(
    title="NexLogix ML Service",
    description="Delivery risk prediction service powered by scikit-learn.",
    version="1.0.0",
)

# Allow calls from the C# backend and Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5000",   # ASP.NET Core API
        "http://localhost:5173",   # Vite frontend dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictions.router)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "NexLogix ML"}
