from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import NullPool
from app.config import DATABASE_URL

# Neon requires NullPool for serverless PostgreSQL
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"},
    poolclass=NullPool
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
