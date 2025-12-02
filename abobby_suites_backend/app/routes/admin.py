from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.deps import get_db, get_current_admin
from app import crud, schemas
from app.utils import send_otp_email  # function to send OTP to email

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

# Admin dashboard
@router.get("/dashboard")
def admin_dashboard(current_admin: schemas.User = Depends(get_current_admin)):
    return {"msg": f"Welcome {current_admin.full_name}, admin dashboard working"}


# ----------------------
# Forgot password / reset
# ----------------------

@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Generate OTP
    otp = utils.generate_otp()
    user.otp = otp  # store in DB
    db.commit()

    # Send OTP to user's email
    send_otp_email(user.email, otp)
    return {"msg": "OTP sent to your email"}

@router.post("/reset-password")
def reset_password(payload: schemas.ResetPassword, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, payload.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.otp != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # Update password
    hashed_pw = utils.hash_password(payload.new_password)
    user.password = hashed_pw
    user.otp = None  # clear OTP
    db.commit()
    return {"msg": "Password reset successful"}

@router.put("/verify-payment/{booking_id}")
def verify_payment(booking_id: int, status: str, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(404, "Booking not found")

    if status not in ["verified", "rejected"]:
        raise HTTPException(400, "Invalid status")

    booking.payment_status = status
    db.commit()
    return {"msg": f"Payment {status}"}
