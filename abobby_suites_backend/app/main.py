import sys
import os
import logging

# Fix relative imports for Render / Codespaces
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ALLOWED_ORIGINS, ENVIRONMENT
from app.database import Base, engine

# Routers
from app.routes import auth, rooms, bookings, contact, admin, payments

app = FastAPI(
    title="Abobby Suites API",
    version="1.0.0",
    description="Hotel booking management API",
    docs_url="/docs" if ENVIRONMENT != "production" else None,  # Disable docs in production
    redoc_url="/redoc" if ENVIRONMENT != "production" else None,
)

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
    return {"status": "Abobby Suites API is running 🚀", "environment": ENVIRONMENT}

@app.get("/health")
def health_check():
    return {"status": "healthy", "environment": ENVIRONMENT}

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting {ENVIRONMENT} server...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down server...")

