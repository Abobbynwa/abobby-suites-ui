from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from app import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -----------------------
# User CRUD
# -----------------------
def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_password,
        is_admin=user.is_admin or 0
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str) -> Optional[models.User]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user


# -----------------------
# Admin CRUD
# -----------------------
def get_admin_by_user_id(db: Session, user_id: int) -> Optional[models.Admin]:
    return db.query(models.Admin).filter(models.Admin.user_id == user_id).first()

def create_admin(db: Session, user_id: int) -> models.Admin:
    admin = models.Admin(user_id=user_id)
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


# -----------------------
# Rooms CRUD
# -----------------------
def get_rooms(db: Session) -> List[models.Room]:
    return db.query(models.Room).all()

def get_room(db: Session, room_id: int) -> Optional[models.Room]:
    return db.query(models.Room).filter(models.Room.id == room_id).first()

def create_room(db: Session, room: schemas.RoomCreate) -> models.Room:
    db_room = models.Room(name=room.name, capacity=room.capacity)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def delete_room(db: Session, room_id: int):
    db.query(models.Room).filter(models.Room.id == room_id).delete()
    db.commit()


# -----------------------
# Bookings CRUD
# -----------------------
def check_room_availability(db: Session, room_id: int, start_time: datetime, end_time: datetime) -> bool:
    overlapping = db.query(models.Booking).filter(
        models.Booking.room_id == room_id,
        models.Booking.start_time < end_time,
        models.Booking.end_time > start_time
    ).first()
    return overlapping is None

def create_booking(db: Session, booking: schemas.BookingCreate) -> models.Booking:
    if not check_room_availability(db, booking.room_id, booking.start_time, booking.end_time):
        raise ValueError("Room not available for the selected time")
    db_booking = models.Booking(
        user_id=booking.user_id,
        room_id=booking.room_id,
        start_time=booking.start_time,
        end_time=booking.end_time
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings(db: Session, user_id: Optional[int] = None) -> List[models.Booking]:
    query = db.query(models.Booking)
    if user_id:
        query = query.filter(models.Booking.user_id == user_id)
    return query.all()


# -----------------------
# Contact CRUD
# -----------------------
def create_contact(db: Session, contact: schemas.ContactCreate) -> models.Contact:
    db_contact = models.Contact(
        name=contact.name,
        email=contact.email,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def get_contacts(db: Session) -> List[models.Contact]:
    return db.query(models.Contact).all()
