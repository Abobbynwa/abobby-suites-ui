from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.deps import get_db

router = APIRouter()

@router.post("/")
def create_booking(payload: schemas.BookingCreate, db: Session = Depends(get_db)):

    conflict = db.query(models.Booking).filter(
        models.Booking.room_id == payload.room_id,
        models.Booking.start_date <= payload.end_date,
        models.Booking.end_date >= payload.start_date
    ).first()

    if conflict:
        raise HTTPException(400, "Room not available for these dates")

    booking = models.Booking(**payload.dict())
    db.add(booking)
    db.commit()
    return {"msg": "Booking confirmed"}
