from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter()

@router.post("/")
def contact_message(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    msg = models.Contact(**payload.dict())
    db.add(msg)
    db.commit()
    return {"msg": "Message received"}
