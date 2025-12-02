from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter()

@router.get("/")
def get_rooms(db: Session = Depends(get_db)):
    return db.query(models.Room).all()

@router.post("/")
def create_room(payload: schemas.RoomCreate, db: Session = Depends(get_db)):
    room = models.Room(name=payload.name, price=payload.price)
    db.add(room)
    db.commit()
    return {"msg": "Room added"}
