import os
from dotenv import load_dotenv

load_dotenv()

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Database
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

# Auth
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise ValueError("SECRET_KEY environment variable is required in production")
    else:
        SECRET_KEY = "development-secret-key-change-in-production"

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# CORS
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

ALLOWED_ORIGINS = [
    FRONTEND_URL,
    BACKEND_URL,
    "http://localhost",
    "http://127.0.0.1",
]

# Add production domains
if ENVIRONMENT == "production":
    ALLOWED_ORIGINS.extend([
        "https://your-production-frontend.com",  # Replace with actual domain
        "https://abobby-suites.onrender.com",   # Example Render domain
    ])
