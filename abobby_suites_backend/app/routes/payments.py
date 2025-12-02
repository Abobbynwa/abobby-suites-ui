from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Booking
from app.deps import get_db
import uuid
import os

router = APIRouter()

UPLOAD_DIR = "uploads/payment_proofs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-payment-proof/{booking_id}")
async def upload_payment_proof(
    booking_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(404, "Booking not found")

    filename = f"{uuid.uuid4()}_{file.filename}"
    filepath = f"{UPLOAD_DIR}/{filename}"

    with open(filepath, "wb") as f:
        f.write(await file.read())

    booking.payment_proof = filepath
    booking.payment_status = "pending"
    db.commit()
    db.refresh(booking)

    return {
        "msg": "Payment proof uploaded successfully",
        "payment_status": booking.payment_status,
    }
