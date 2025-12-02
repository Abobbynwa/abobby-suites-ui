from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, utils
from app.deps import get_db

router = APIRouter()

@router.post("/register")
def register_user(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    exists = db.query(models.User).filter(models.User.email == payload.email).first()
    if exists:
        raise HTTPException(400, "Email already registered")

    hashed_pw = utils.hash_password(payload.password)
    user = models.User(full_name=payload.full_name, email=payload.email, password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created", "id": user.id}

@router.post("/login")
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not utils.verify_password(payload.password, user.password):
        raise HTTPException(400, "Invalid credentials")

    token = utils.create_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}
