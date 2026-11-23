# NexLogix

Enterprise shipment tracking and delivery risk prediction platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend API | C# · ASP.NET Core Web API · Entity Framework Core |
| Database | MySQL (AWS RDS) via EF Core + Pomelo |
| ML Service | Python · FastAPI · scikit-learn |
| Cloud | AWS EC2 · RDS · S3 · CloudWatch · IAM |

---

## Project Structure

```
NexLogix/
├── frontend/          ← React.js (Vite + Tailwind)
└── backend/
    ├── NexLogix.API/  ← ASP.NET Core Web API (C#)
    └── NexLogix.ML/   ← FastAPI ML service (Python)
```

---

## Running Locally

### 1 · Frontend (React)
```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_BASE_URL
npm run dev                  # → http://localhost:5173
```

### 2 · Backend API (C#)
```bash
cd backend/NexLogix.API
# Fill in appsettings.json (MySQL connection string, JWT secret)
dotnet restore
dotnet ef database update    # run EF Core migrations
dotnet run                   # → http://localhost:5000
# Swagger UI → http://localhost:5000/swagger
```

### 3 · ML Service (Python)
```bash
cd backend/NexLogix.ML
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env         # set DATABASE_URL
python training/train_model.py   # train the scikit-learn model
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000
# Docs → http://localhost:8000/docs
```

---

## API Overview

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Sign in, get JWT |
| POST | `/api/auth/register` | Create account |
| GET | `/api/shipments` | List shipments (paginated) |
| GET | `/api/shipments/{id}` | Single shipment |
| POST | `/api/shipments` | Create shipment |
| GET | `/api/customers` | List customers |
| GET | `/api/exceptions` | List delivery exceptions |
| GET | `/api/predictions/{shipmentId}` | ML risk prediction (proxied) |
| POST | `/predict/` | ML service direct endpoint |
