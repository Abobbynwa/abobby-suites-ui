import sys
import os

# Fix relative imports for Render / Codespaces
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ALLOWED_ORIGINS
from app.database import Base, engine

# Routers
from app.routes import auth, rooms, bookings, contact, admin
from app.routers import payments   # <-- Your payment routes

app = FastAPI(title="Abobby Suites API")

# IMPORTANT:
# Do NOT create tables manually when using Alembic migrations.
# Base.metadata.create_all(bind=engine)  # ❌ REMOVE this line


# ======================================================
# CORS CONFIG
# ======================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# ROUTES
# ======================================================
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(rooms.router, prefix="/rooms", tags=["Rooms"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(contact.router, prefix="/contact", tags=["Contact"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])

# Root test endpoint
@app.get("/")
def root():
    return {"status": "Abobby Suites API is running 🚀"}

